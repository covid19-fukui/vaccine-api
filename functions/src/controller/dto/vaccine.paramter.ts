import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class VaccineParamter {
  @ApiProperty({ example: 18, description: '都道府県コード(福井県のみ対応)' })
  @IsNotEmpty()
  @IsNumberString()
  prefectureId: string;

  /**
   * コンストラクタ
   *
   * @param prefectureId prefectureId
   */
  constructor(prefectureId: string) {
    this.prefectureId = prefectureId;
  }
}
