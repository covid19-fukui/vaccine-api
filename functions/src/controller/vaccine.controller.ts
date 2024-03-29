import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http.exception.filter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import VaccineListApiResponse from './dto/vaccine.list.api.response';
import VaccineParameter from './dto/vaccineParameter';
import { VaccineService } from '../service/vaccine.service';
import VaccineApiResponse from './dto/vaccine.api.response';
import VaccineQuery from './dto/vaccine.query';

/**
 * コントローラ
 */
@Controller('api/v1/vaccine')
@ApiTags('api/v1/vaccine')
@UseFilters(HttpExceptionFilter)
export class VaccineController {
  /**
   * コンストラクタ
   *
   * @param {VaccineService} vaccineService サービス
   */
  constructor(private readonly vaccineService: VaccineService) {}

  /**
   * ワクチン接種状況の検索
   *
   * @param {VaccineQuery} query パラメータ
   * @returns {Promise<VaccineListApiResponse>} ワクチン接種状況のレスポンス
   */
  @Get('search')
  @ApiOkResponse({
    status: 200,
    description: 'ワクチン接種状況の取得が成功した場合、レスポンスとして返す',
    type: VaccineListApiResponse,
  })
  async getVaccines(
    @Query() query: VaccineQuery,
  ): Promise<VaccineListApiResponse> {
    return this.vaccineService.findVaccines(query);
  }

  /**
   * ワクチン接種状況の取得
   *
   * @param {VaccineParameter} parameter パラメータ
   * @returns {Promise<VaccineListApiResponse>} ワクチン接種状況のレスポンス
   */
  @Get(':prefectureCode/:date')
  @ApiOkResponse({
    status: 200,
    description:
      '日付指定でワクチン接種状況の取得が成功した場合、レスポンスとして返す',
    type: VaccineApiResponse,
  })
  async getVaccine(
    @Param() parameter: VaccineParameter,
  ): Promise<VaccineApiResponse> {
    return this.vaccineService.getVaccine(
      parameter.prefectureCode,
      parameter.date,
    );
  }
}
