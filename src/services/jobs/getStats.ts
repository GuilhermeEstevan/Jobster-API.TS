import mongoose from "mongoose";
import JobsModel from "../../models/jobs";
import moment from "moment";

type TdefaultStats = {
  pendente: number;
  recusado: number;
  entrevista: number;
};

interface TAggregationResult {
  _id: string;
  count: number;
}

const getStats = async (userId: string) => {
  let stats: TAggregationResult[] = await JobsModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  console.log(stats);

  const statsObject = stats.reduce((acc, current) => {
    const { _id: title, count } = current;
    acc[title] = count;
    return acc;
  }, {} as Record<string, number>);

  console.log(statsObject);

  const defaultStats: TdefaultStats = {
    pendente: statsObject.pendente || 0,
    entrevista: statsObject.entrevista || 0,
    recusado: statsObject.recusado || 0,
  };

  // MONTHLY APPLICATION

  let monthlyApplication = await JobsModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  console.log(monthlyApplication);

  return { defaultStats, monthlyApplication };
};

export { getStats };
