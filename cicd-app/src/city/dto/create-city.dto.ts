export class CreateCityDto {
  department_code: string;
  insee_code: string | null;
  zip_code: string | null;
  name: string;
  lat: number;
  lon: number;
}
