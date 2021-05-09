const prefix = "api/hr/v1/";
module.exports = {
  api: {
    login: prefix + "auth/login",
    dmNhanvien: prefix + "dm-nhan-vien",
    dmBoPhan: prefix + "dm-bo-phan",
    dmDuAn: prefix + "dm-du-an",
    files: prefix + "files",
    dmchuyenmon: prefix + "dm-chuyen-mon",
    dmnguontuyendung: prefix + "dm-nguon-tuyen-dung",
    dmvaitro: prefix + "dm-vai-tro",
    dmquyen: prefix + "dm-quyen",
    nvChamCong: {
      search: prefix + "nv-cham-cong",
      createOrEdit: prefix + "nv-cham-cong",
      exportDate: prefix + "nv-cham-cong/bao-cao-ngay",
    },
    nvNgayNghi: prefix + "nv-ngay-nghi",
    nvHopDongLaoDong: prefix + "nv-hop-dong-lao-dong",
    dmLoaiHopDong: prefix + "dm-loai-hop-dong",
    adTinTuc: prefix + "ad-tin-tuc",
    thongBao: prefix + "ad-thong-bao",
    lamNgoaiGio: prefix + "nv-lam-ngoai-gio",
    khuVuChamCong: prefix + "dm-khu-vuc-cham-cong",
    nvDuAn: prefix + "nv-du-an",
    enums: prefix + 'utils/enums',
    lam_ngoai_gio:prefix + 'dm-lam-ngoai-gio'
  },
};
