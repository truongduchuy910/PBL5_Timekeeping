const { default: axios } = require("axios");

module.exports = class GiaoHangNhanh {
  Token = "c804e1a4-7da2-11eb-8be2-c21e19fc6803";
  //
  GhnProvinceType =
    "type GhnProvince { key: String, name: String, code: String }";
  allGhnProvinces = "allGhnProvinces: [GhnProvince]";
  //
  GhnDistrictType =
    "type GhnDistrict { key: String, name: String, code: String }";
  allGhnDistricts = "allGhnDistricts(code: String): [GhnDistrict]";
  //
  GhnWardType = "type GhnWard { key: String, name: String, code: String }";
  allGhnWards = "allGhnWards(code: String): [GhnWard]";
  //
  config = {
    types: [
      {
        type: this.GhnProvinceType,
      },
      {
        type: this.GhnDistrictType,
      },
      {
        type: this.GhnWardType,
      },
    ],
    queries: [
      {
        schema: this.allGhnProvinces,
        resolver: async (item, variables, context, info, { query, access }) => {
          return await this.getProvince();
        },
      },
      {
        schema: this.allGhnDistricts,
        resolver: async (item, variables, context, info, { query, access }) => {
          return variables.code
            ? await this.getDistrict({ province_id: variables.code })
            : [];
        },
      },
      {
        schema: this.allGhnWards,
        resolver: async (item, variables, context, info, { query, access }) => {
          const Token = "c804e1a4-7da2-11eb-8be2-c21e19fc6803";

          return variables.code
            ? await this.getWard({ district_id: variables.code })
            : [];
        },
      },
    ],
  };
  provinces = [];
  getProvince = async () => {
    if (!this.provinces || !this.provinces.length) {
      const {
        data: { data },
      } = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        { headers: { Token: this.Token } }
      );
      this.provinces = data.map((province) => ({
        key: province.ProvinceID,
        name: province.ProvinceName,
        code: province.Code,
      }));
    }
    return this.provinces;
  };
  getDistrict = async ({ province_id }) => {
    const {
      data: { data },
    } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      {
        params: { province_id },
        headers: { Token: this.Token },
      }
    );

    const result = data.map((province) => ({
      key: province.DistrictID,
      name: province.DistrictName,
      code: province.Code,
    }));
    return result;
  };
  getWard = async ({ district_id }) => {
    const {
      data: { data },
    } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
      {
        params: { district_id },
        headers: { Token: this.Token },
      }
    );

    const result = data.map((province) => ({
      key: province.WardID,
      name: province.WardName,
      code: province.WardCode,
    }));
    return result;
  };
};
