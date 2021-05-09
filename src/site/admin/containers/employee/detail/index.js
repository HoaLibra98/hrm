import React, { useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import moment from "moment";
import DataContants from "config/data-contants";
import "../style.scss";
const EmployeeDetail = (props) => {
  const id = props.match.params.id;
  const {
    location: { state: { ChuyenMon = "", BoPhan = "" } = {} },
  } = props;
  useEffect(() => {
    if (id) {
      props.getDetail(id).then((s) => {});
      props.loadEmployeeProject({ page: 1, nhanVienId: id });
    }
    props.loadProject({ page: 1, size: 1000 });
    props.loadRecruitment({ page: 1 });
  }, []);
  const onClose = () => {
    props.onReset();
    props.history.push("/danh-sach-nhan-vien");
  };
  const getRecruitment = (item) => {
    var data = props.listRecruitment.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
  };
  let exts = (props.cv && props.cv.split(".")) || [];
  let urlCV = (exts.length && exts[exts.length - 1].toLowerCase()) || "";
  const getStatus = (item) => {
    var data = DataContants.trangThaiTaiKhoan.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
  };
  return (
    <AdminPage className="mgr-user-create">
      <Panel
        title={"Chi tiết nhân viên"}
        id={"mgr-user-create"}
        allowClose={false}
        allowCollapse={false}
        icon={[<i className="fal fa-users"></i>]}
      >
        <div className="row">
          <div className="col-12 project-create-employee">
            <p>
              <b>Dự án được phân công : </b>
              <span className="project-detail-employee">
                {props.listProject.map((item) => {
                  if (
                    !!props.listEmployeeProject.filter(
                      (el) => el.duAnId === item.id
                    ).length
                  ) {
                    return (
                      <span className="item" key={item.id}>
                        {item.ten}
                      </span>
                    );
                  }
                })}
              </span>
            </p>
            <p>
              <b>Trạng thái : </b>
              <span
                style={{
                  background: getStatus(+props.trangThai).color,
                  color: "white",
                  borderRadius: "5pt",
                  padding: "2px 6px",
                }}
              >
                {getStatus(+props.trangThai).ten}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>Mã nhân viên : </b> {props.ma}
            </p>
            <p>
              <b>Tên tài khoản : </b> {props.taiKhoan}
            </p>
            <p>
              <b>Họ và tên : </b> {props.ten}
            </p>
            <p style={{ wordBreak: "break-word" }}>
              <b>Email : </b> {props.email}
            </p>
            <p style={{ wordBreak: "break-word" }}>
              <b>iSofH Email : </b> {props.isofhEmail}
            </p>
            <p>
              <b>Số điện thoại : </b> {props.soDienThoai}
            </p>
            <p>
              <b>Ngày sinh : </b>
              {props.ngaySinh && moment(props.ngaySinh).format("DD/MM/YYYY")}
            </p>
            <p>
              <b>Giới tính : </b>
              {props.gioiTinh === 1
                ? "Nam"
                : props.gioiTinh === 2
                ? "Nữ"
                : null}
            </p>
            <p>
              <b>Mức lương : </b> {props.mucLuong || 0}
            </p>
          </div>

          <div className="col-4">
            <p>
              <b>Trường đào tạo : </b> {props.truongDaoTao}
            </p>
            <p>
              <b>Chuyên ngành : </b> {props.chuyenNganh}
            </p>
            <p>
              <b>Nơi ở hiện tại : </b> {props.diaChiTamTru}
            </p>
            <p>
              <b>Địa chỉ thường trú : </b> {props.diaChiHienTai}
            </p>
            <p>
              <b>Chứng minh nhân dân : </b> {props.soCanCuoc}
            </p>
            <p>
              <b>Nơi cấp : </b> {props.noiCapCanCuoc}
            </p>
            <p>
              <b>Ngày cấp : </b>{" "}
              {props.ngayCapCanCuoc &&
                moment(props.ngayCapCanCuoc).format("DD/MM/YYYY")}
            </p>
            <p>
              <b>Ngày bắt đầu làm việc : </b>{" "}
              {props.thoiGianBatDauLamViec &&
                moment(props.thoiGianBatDauLamViec).format("DD/MM/YYYY")}
            </p>
            <p>
              <b>Ngày kết thúc làm việc : </b>{" "}
              {props.thoiGianKetThucLamViec &&
                moment(props.thoiGianKetThucLamViec).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="col-4">
            <p>
              {props.avatar ? (
                <img
                  src={props.avatar.absoluteFileUrl()}
                  alt=" "
                  style={{ height: "90px" }}
                />
              ) : (
                <img
                  src={require("resources/images/nhanvien/anhdaidien.png")}
                  alt=" "
                  style={{ height: "90px" }}
                />
              )}
            </p>
            <p>
              <b>Bộ phận : </b> {(props.dmBoPhan || {}).ten}
            </p>
            <p>
              <b>Chuyên môn : </b> {(props.dmChuyenMon || {}).ten}
            </p>
            <p>
              <b>Nguồn tuyển dụng :</b>{" "}
              {getRecruitment(props.dmNguonTuyenDungId) &&
                getRecruitment(props.dmNguonTuyenDungId).ten}
            </p>
            <p>
              <b>Số ngày phép :</b> {props.soNgayPhep || 0}
            </p>
            <p>
              <b>Mã số thuế :</b> {props.maSoThue}
            </p>
          </div>
          <div className="col-12">
            <p>
              <b>CV : </b>
              {props.cv && (urlCV === "doc" || urlCV === "docx") ? (
                <a
                  className="link-file"
                  href={props.cv.absoluteFileUrl()}
                  download
                  style={{ display: "initial" }}
                >
                  {props.cv}
                </a>
              ) : props.cv && urlCV === "pdf" ? (
                <a
                  target="_blank"
                  href={props.cv.absoluteFileUrl()}
                  rel="noopener noreferrer"
                >
                  {props.cv}
                </a>
              ) : null}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "16px 16px 0px",
            background: "#fff",
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }} type="primary">
            Quay lại
          </Button>
        </div>
      </Panel>
    </AdminPage>
  );
};
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      ten: state.employee.ten,
      thoiGianBatDauLamViec: state.employee.thoiGianBatDauLamViec,
      thoiGianKetThucLamViec: state.employee.thoiGianKetThucLamViec,
      isofhEmail: state.employee.isofhEmail,
      email: state.employee.email,
      soDienThoai: state.employee.soDienThoai,
      dmChuyenMon: state.employee.dmChuyenMon || {},
      dmBoPhan: state.employee.dmBoPhan || {},
      dmNguonTuyenDungId: state.employee.dmNguonTuyenDungId || null,
      gioiTinh: state.employee.gioiTinh,
      soCanCuoc: state.employee.soCanCuoc,
      ngayCapCanCuoc: state.employee.ngayCapCanCuoc,
      noiCapCanCuoc: state.employee.noiCapCanCuoc,
      diaChiHienTai: state.employee.diaChiHienTai,
      diaChiTamTru: state.employee.diaChiTamTru,
      truongDaoTao: state.employee.truongDaoTao,
      chuyenNganh: state.employee.chuyenNganh,
      cv: state.employee.cv,
      nvHopDongLaoDong: state.employee.nvHopDongLaoDong,
      maSoThue: state.employee.maSoThue,
      soNgayPhep: state.employee.soNgayPhep,
      dmVaiTroIds: state.employee.dmVaiTroIds,
      listRecruitment: state.recruitment.listRecruitment,
      avatar: state.employee.anhDaiDien,
      taiKhoan: state.employee.taiKhoan,
      ngaySinh: state.employee.ngaySinh,
      mucLuong: state.employee.mucLuong,
      ma: state.employee.ma,
      listEmployeeProject: state.employeeProject.listEmployeeProject,
      listProject: state.project.listProject,
      trangThai: state.employee.trangThai,
    };
  },
  ({
    employee: { loadEmployee, onReset, getDetail },
    recruitment: { loadRecruitment },
    employeeProject,
    project,
  }) => {
    return {
      loadEmployee,
      loadRecruitment,
      onReset,
      getDetail,
      loadEmployeeProject: employeeProject.loadEmployeeProject,
      loadProject: project.loadProject,
    };
  }
)(EmployeeDetail);
