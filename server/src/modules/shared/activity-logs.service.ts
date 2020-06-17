import { Injectable } from '@nestjs/common';
import { ActivityLog } from './activity-log.entity';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ActivityLogService {
  save = async (
    req: any,
    userId: string,
    type: string,
  ): Promise<ActivityLog | null> => {
    try {
      const userAgent: string = req.headers['user-agent'];
      const ipAddress: string = req.connection['remoteAddress'];
      const result: AxiosResponse<any> = await axios.get(
        `https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_API_TOKEN}`,
      );
      const log: ActivityLog = await ActivityLog.create({
        ipAddress,
        userAgent,
        actionType: type,
        city: result.data.city || '',
        region: result.data.region || '',
        country: result.data.country || '',
        loc: result.data.loc || '',
        postal: result.data.postal || '',
        userId,
      }).save();
      return log;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  find = async (conditions: Object) => {
    return await ActivityLog.find(conditions);
  };
}
