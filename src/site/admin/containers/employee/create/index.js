import React, { useEffect } from "react";
import { Form, Button, Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import ListFile from "site/admin/components/device/ListFile";
import ListImage from "site/admin/components/device/ListImage";
import moment from "moment";
import DataContants from "config/data-contants";
import FilterSelect from "site/admin/components/common/filterSelect";
import "../style.scss";
import { equar } from "utils/common";
function Employee(props) {
  const id = props.match.params.id;
  const {
    ma,
    ten,
    email,
    isofhEmail,
    dmBoPhanId,
    soDienThoai,
    maSoThue,
    soNgayPhep,
    soCanCuoc,
    mucLuong,
    location: { state: { listDepartment = [], listSpecialize = [] } = {} },
  } = props;
  useEffect(() => {
    props.onReset();
    props.updateData({
      checkValidate: false,
    });
    props.updateDataProject({
      duAnIds: [],
    });
    if (id) {
      props.getDetail(id);
      props.loadEmployeeProject({ page: 1, nhanVienId: id });
    }
    props.loadRecruitment();
    props.loadRole();
    props.loadProject({ page: 1, size: 1000 });
    if (listDepartment.length == 0) {
      props.loadDepartment();
    }
    if (listSpecialize.length == 0) {
      props.loadSpecialize();
    }
  }, []);
  const onClose = () => {
    props.onReset();
    props.history.push("/danh-sach-nhan-vien");
  };
  const handleSubmit = (e) => {
    let payload = {
      id,
      param: {
        thoiGianBatDauLamViec:
          props.thoiGianBatDauLamViec && props.thoiGianBatDauLamViec._i,
        thoiGianKetThucLamViec:
          props.thoiGianKetThucLamViec && props.thoiGianKetThucLamViec._i,
        ten: ten,
        isofhEmail: isofhEmail,
        email: email,
        soDienThoai: soDienThoai,
        trangThai: id ? props.trangThai : 0,
        dmChuyenMonId: props.dmChuyenMonId || null,
        dmBoPhanId: dmBoPhanId || null,
        dmNguonTuyenDungId: props.dmNguonTuyenDungId || null,
        gioiTinh: props.gioiTinh || null,
        soCanCuoc: props.soCanCuoc,
        ngayCapCanCuoc: props.ngayCapCanCuoc && props.ngayCapCanCuoc._i,
        noiCapCanCuoc: (props.noiCapCanCuoc || "").trim(),
        diaChiHienTai: (props.diaChiHienTai || "").trim(),
        diaChiTamTru: (props.diaChiTamTru || "").trim(),
        truongDaoTao: (props.truongDaoTao || "").trim(),
        chuyenNganh: (props.chuyenNganh || "").trim(),
        cv: props.cv,
        nvHopDongLaoDong: props.nvHopDongLaoDong,
        maSoThue: props.maSoThue,
        soNgayPhep: props.soNgayPhep,
        anhDaiDien: props.anhDaiDien,
        taiKhoan: props.taiKhoan,
        ngaySinh: props.ngaySinh && props.ngaySinh._i,
        mucLuong: props.mucLuong,
        matKhau: id ? props.matKhau : "e10adc3949ba59abbe56e057f20f883e",
        dmVaiTroIds: props.dmVaiTroIds,
        ma: ma,
      },
    };
    if (
      !ma ||
      !ten ||
      !email ||
      !isofhEmail ||
      !dmBoPhanId ||
      (soDienThoai && !soDienThoai.isPhoneNumber()) ||
      !email.isEmail() ||
      !isofhEmail.isEmail() ||
      // !dmVaiTroIds ||
      (maSoThue && !maSoThue.uintTextBox()) ||
      (maSoThue && maSoThue.length > 255) ||
      (soNgayPhep && !soNgayPhep.uintTextBox()) ||
      (soCanCuoc && !soCanCuoc.uintTextBox()) ||
      (soCanCuoc && soCanCuoc.length !== 9 && soCanCuoc.length !== 12) ||
      (mucLuong && !mucLuong.toString().uintTextBox())
    ) {
      props.updateData({
        checkValidate: true,
      });
      return;
    } else {
      let el = (props.duAnIds || []).sort((a, b) => a - b);
      let el1 = (props.duAnIdsCheck || []).sort((a, b) => a.duAnId - b.duAnId);
      if (
        equar(
          el,
          el1.reduce((arr, current) => [...arr, current.duAnId], [])
        )
      ) {
      } else {
        let bodyCreate = el.filter(
          (item) =>
            !el1.some(function (item1) {
              return item1.duAnId === item;
            })
        );
        let bodyDelete = el1.filter(
          (item) =>
            !el.some(function (item1) {
              return item.duAnId === item1;
            })
        );
        let param = [];
        param = bodyCreate.reduce(
          (value, currentValue) => [
            ...value,
            {
              nhanVienId: id,
              duAnId: currentValue,
              tuNgay: moment().format("YYYY-MM-DD"),
              denNgay: null,
            },
          ],
          []
        );
        if (!!(bodyDelete || []).length) {
          let param = bodyDelete.reduce(
            (arr, current) => [...arr, current.id],
            []
          );
          props.onDeleteMore(param);
        }
        if (!!(param || []).length) {
          props.tagsProject({ param: [...param] });
        }
      }
      props.createOrEdit(payload).then((s) => {
        if (s && s.code === 0) {
          props.history.push("/danh-sach-nhan-vien");
        }
      });
    }
  };
  const checkPrice = (item) => {
    return item.replace(/\./g, "");
  };
  const handleChange = (e, item, option) => {
    if (option === 1) {
      if (item === "mucLuong") {
        props.updateData({
          [item]: checkPrice(e.target.value),
        });
      } else if (item === "ma") {
        props.updateData({
          [item]: e.target.value.replace(" ", ""),
        });
      } else {
        props.updateData({
          [item]: e.target.value,
        });
      }
    } else if (option === 2) {
      props.updateData({
        [item]: e,
      });
    } else if (option === 3) {
      props.updateData({
        [item]: e && moment(e._d),
      });
    }
  };
  const onChangeImage = (e, item) => {
    props.updateData({
      [item]: e,
    });
  };
  return (
    <AdminPage className="mgr-user-create">
      <Panel
        title={id ? "C???p nh???t nh??n vi??n" : "Th??m m???i nh??n vi??n"}
        id={"mgr-user-create"}
        allowClose={false}
        allowCollapse={false}
        icon={[<i className="fal fa-users"></i>]}
      >
        <Form layout="vertical" hideRequiredMark>
          <div className="row">
            {!!id && (
              <div className="col-12 project-create-employee">
                <Form.Item label="D??? ??n ???????c ph??n c??ng:">
                  <FilterSelect
                    mode="multiple"
                    onChange={(e) => {
                      props.updateDataProject({
                        duAnIds: e,
                      });
                    }}
                    placeholder="Ch??a c?? d??? ??n n??o"
                    value={props.duAnIds}
                    listData={props.listProject}
                    // disabled
                  />
                </Form.Item>
              </div>
            )}
            <div className="col-md-4 col-12">
              <Form.Item label="Vai tr??:">
                <FilterSelect
                  mode="multiple"
                  onChange={(e) => {
                    handleChange(e, "dmVaiTroIds", 2);
                  }}
                  // disabled={id ? true : false}
                  placeholder="Ch???n vai tr??"
                  value={props.dmVaiTroIds}
                  listData={props.listRole}
                  // checkValidate={props.checkValidate && !dmVaiTroIds}
                  // valueError={"Vui l??ng ch???n vai tr??"}
                  noFillAll={true}
                />
              </Form.Item>
              {id ? (
                <Form.Item label="T??n t??i kho???n:">
                  <Input
                    value={props.taiKhoan}
                    placeholder="Nh???p t??n t??i kho???n"
                    disabled
                  />
                </Form.Item>
              ) : null}
              <Form.Item label="M?? nh??n vi??n (*):">
                <Input
                  value={props.ma}
                  placeholder="Nh???p M?? nh??n vi??n"
                  // disabled={!!id}
                  onChange={(e) => {
                    handleChange(e, "ma", 1);
                  }}
                />
                {props.checkValidate && !ma ? (
                  <div className="error">Vui l??ng nh???p m?? nh??n vi??n!</div>
                ) : null}
              </Form.Item>
              <Form.Item label="H??? v?? t??n (*): ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "ten", 1);
                  }}
                  value={props.ten}
                  placeholder="Nh???p h??? v?? t??n"
                />
                {props.checkValidate && !ten ? (
                  <div className="error">Vui l??ng nh???p h??? v?? t??n!</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Email (*): ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "email", 1);
                  }}
                  placeholder="Nh???p email"
                  value={props.email}
                />
                {props.checkValidate && !email ? (
                  <div className="error">Vui l??ng nh???p email!</div>
                ) : props.checkValidate && !email.isEmail() ? (
                  <div className="error">
                    Vui l??ng nh???p ????ng ?????nh d???ng email!
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="iSofH Email (*): ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "isofhEmail", 1);
                  }}
                  disabled={id ? true : false}
                  placeholder="Nh???p iSofH Email"
                  value={props.isofhEmail}
                />
                {props.checkValidate && !isofhEmail ? (
                  <div className="error">Vui l??ng nh???p iSofH Email!</div>
                ) : props.checkValidate && !isofhEmail.isEmail() ? (
                  <div className="error">
                    Vui l??ng nh???p ????ng ?????nh d???ng email!
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="S??? ??i???n tho???i: ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "soDienThoai", 1);
                  }}
                  placeholder="Nh???p s??? ??i???n tho???i"
                  value={props.soDienThoai}
                  type="number"
                />
                {props.checkValidate &&
                soDienThoai &&
                !soDienThoai.isPhoneNumber() ? (
                  <div className="error">Vui l??ng nh???p ????ng ?????nh d???ng s??t!</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Ng??y sinh: ">
                <DatePicker
                  onChange={(e) => {
                    handleChange(e, "ngaySinh", 3);
                  }}
                  style={{ width: "100%" }}
                  disabledDate={(d) => {
                    return d._d > new Date();
                  }}
                  format="DD/MM/YYYY"
                  placeholder="Nh???p ng??y sinh"
                  value={props.ngaySinh}
                />
              </Form.Item>
              <Form.Item label="Gi???i t??nh:">
                <FilterSelect
                  onChange={(e) => {
                    handleChange(e, "gioiTinh", 2);
                  }}
                  placeholder="Ch???n gi???i t??nh"
                  value={props.gioiTinh}
                  listData={DataContants.gioiTinh}
                />
              </Form.Item>
              <Form.Item label="M???c l????ng: ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "mucLuong", 1);
                  }}
                  placeholder="Nh???p m???c l????ng"
                  value={props.mucLuong ? props.mucLuong.formatPrice() : null}
                />
                {props.checkValidate &&
                mucLuong &&
                !mucLuong.toString().uintTextBox() ? (
                  <div className="error">Vui l??ng nh???p s???!</div>
                ) : null}
              </Form.Item>
            </div>
            <div className="col-md-4 col-12">
              <Form.Item label="Tr?????ng ????o t???o:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "truongDaoTao", 1);
                  }}
                  placeholder="Nh???p tr?????ng ?????o t???o"
                  value={props.truongDaoTao}
                />
              </Form.Item>
              <Form.Item label="Chuy??n ng??nh:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "chuyenNganh", 1);
                  }}
                  placeholder="Nh???p chuy??n ng??nh"
                  value={props.chuyenNganh}
                />
              </Form.Item>
              <Form.Item label="N??i ??? hi???n t???i: ">
                <Input
                  onChange={(e) => {
                    handleChange(e, "diaChiTamTru", 1);
                  }}
                  placeholder="Nh???p n??i ??? hi???n t???i"
                  value={props.diaChiTamTru}
                />
              </Form.Item>
              <Form.Item label="?????a ch??? th?????ng tr??:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "diaChiHienTai", 1);
                  }}
                  placeholder="Nh???p ?????a ch??? th?????ng tr??"
                  value={props.diaChiHienTai}
                />
              </Form.Item>
              <Form.Item label="Ch???ng minh nh??n d??n:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "soCanCuoc", 1);
                  }}
                  placeholder="Nh???p ch???ng minh nh??n d??n"
                  value={props.soCanCuoc}
                />
                {props.checkValidate &&
                soCanCuoc &&
                !soCanCuoc.uintTextBox() ? (
                  <div className="error">Vui l??ng nh???p s???!</div>
                ) : props.checkValidate &&
                  soCanCuoc &&
                  soCanCuoc.length !== 9 &&
                  soCanCuoc.length !== 12 ? (
                  <div className="error">
                    Vui l??ng nh???p cmnd 9 ho???c 12 k?? t???!
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="N??i c???p:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "noiCapCanCuoc", 1);
                  }}
                  placeholder="Nh???p n??i c???p"
                  value={props.noiCapCanCuoc}
                />
              </Form.Item>
              <Form.Item label="Ng??y c???p: ">
                <DatePicker
                  onChange={(e) => {
                    handleChange(e, "ngayCapCanCuoc", 3);
                  }}
                  style={{ width: "100%" }}
                  disabledDate={(d) => {
                    return d._d > new Date();
                  }}
                  format="DD/MM/YYYY"
                  placeholder="Nh???p ng??y c???p"
                  value={props.ngayCapCanCuoc}
                />
              </Form.Item>
              <Form.Item label="M?? s??? thu???:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "maSoThue", 1);
                  }}
                  placeholder="Nh???p m?? s??? thu???"
                  value={props.maSoThue}
                />
                {props.checkValidate && maSoThue && !maSoThue.uintTextBox() ? (
                  <div className="error">
                    Vui l??ng nh???p ????ng ?????nh d???ng m?? s??? thu???!
                  </div>
                ) : props.checkValidate && maSoThue && maSoThue.length > 255 ? (
                  <div className="error">
                    Vui l??ng nh???p m?? s??? thu??? nh??? h??n 255 k?? t???!
                  </div>
                ) : null}
              </Form.Item>
              {!!id && (
                <Form.Item label="Tr???ng th??i:">
                  <FilterSelect
                    onChange={(e) => {
                      handleChange(e, "trangThai", 2);
                    }}
                    placeholder="Ch???n tr???ng th??i"
                    value={props.trangThai}
                    listData={DataContants.trangThaiTaiKhoan}
                  />
                </Form.Item>
              )}
            </div>
            <div className="col-md-4 col-12">
              <Form.Item label="???nh ?????i di???n: ">
                <ListImage
                  uploadImage={(e) => onChangeImage(e, "anhDaiDien")}
                  files={props.anhDaiDien}
                  provider="employee"
                />
              </Form.Item>
              <Form.Item label="B??? ph???n (*):">
                <FilterSelect
                  onChange={(e) => {
                    handleChange(e, "dmBoPhanId", 2);
                  }}
                  placeholder="Ch???n b??? ph???n"
                  value={props.dmBoPhanId}
                  listData={
                    (listDepartment.length > 0 && listDepartment) ||
                    props.listDepartment
                  }
                  checkValidate={props.checkValidate && !props.dmBoPhanId}
                  valueError={"Vui l??ng ch???n b??? ph???n"}
                />
              </Form.Item>
              <Form.Item label="Chuy??n m??n:">
                <FilterSelect
                  onChange={(e) => {
                    handleChange(e, "dmChuyenMonId", 2);
                  }}
                  placeholder="Ch???n chuy??n m??n"
                  value={props.dmChuyenMonId}
                  listData={
                    (listSpecialize.length > 0 && listSpecialize) ||
                    props.listSpecialize
                  }
                />
              </Form.Item>
              <Form.Item label="Ngu???n tuy???n d???ng:">
                <FilterSelect
                  onChange={(e) => {
                    handleChange(e, "dmNguonTuyenDungId", 2);
                  }}
                  placeholder="Ch???n ngu???n tuy???n d???ng"
                  value={props.dmNguonTuyenDungId}
                  listData={props.listRecruitment}
                />
              </Form.Item>
              <Form.Item label="S??? ng??y ph??p:">
                <Input
                  onChange={(e) => {
                    handleChange(e, "soNgayPhep", 1);
                  }}
                  placeholder="Nh???p s??? ng??y ph??p"
                  value={props.soNgayPhep}
                />
                {props.checkValidate &&
                soNgayPhep &&
                !soNgayPhep.uintTextBox() ? (
                  <div className="error">Vui l??ng nh???p s???!</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Ng??y b???t ?????u l??m vi???c:">
                <DatePicker
                  onChange={(e) => {
                    handleChange(e, "thoiGianBatDauLamViec", 3);
                  }}
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Nh???p ng??y b???t ?????u l??m vi???c"
                  value={props.thoiGianBatDauLamViec}
                  disabledDate={(d) => {
                    return props.thoiGianKetThucLamViec
                      ? d._d >= props.thoiGianKetThucLamViec
                      : false;
                  }}
                />
              </Form.Item>
              <Form.Item label="Ng??y k???t th??c l??m vi???c:">
                <DatePicker
                  onChange={(e) => {
                    handleChange(e, "thoiGianKetThucLamViec", 3);
                  }}
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Nh???p ng??y k???t th??c l??m vi???c"
                  value={props.thoiGianKetThucLamViec}
                  disabledDate={(d) => {
                    return props.thoiGianBatDauLamViec
                      ? d._d <= props.thoiGianBatDauLamViec
                      : false;
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item label="CV:">
                <ListFile
                  uploadImage={(e) => onChangeImage(e, "cv")}
                  files={props.cv}
                  types={".doc,.docx,.pdf"}
                  provider="employee"
                />
              </Form.Item>
            </div>
          </div>
          <div className="button-footer-panel">
            <Button
              onClick={onClose}
              style={{ marginRight: 8 }}
              className="btn btn-delete"
            >
              H???y
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              {id ? "L??u thay ?????i" : "T???o m???i"}
            </Button>
          </div>
        </Form>
      </Panel>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      ten: state.employee.ten,
      thoiGianBatDauLamViec:
        state.employee.thoiGianBatDauLamViec &&
        moment(state.employee.thoiGianBatDauLamViec),
      thoiGianKetThucLamViec:
        state.employee.thoiGianKetThucLamViec &&
        moment(state.employee.thoiGianKetThucLamViec),
      isofhEmail: state.employee.isofhEmail,
      email: state.employee.email,
      soDienThoai: state.employee.soDienThoai,
      dmChuyenMonId: state.employee.dmChuyenMonId,
      dmBoPhanId: state.employee.dmBoPhanId,
      dmNguonTuyenDungId: state.employee.dmNguonTuyenDungId,
      gioiTinh: state.employee.gioiTinh,
      soCanCuoc: state.employee.soCanCuoc,
      ngayCapCanCuoc:
        state.employee.ngayCapCanCuoc && moment(state.employee.ngayCapCanCuoc),
      noiCapCanCuoc: state.employee.noiCapCanCuoc,
      diaChiHienTai: state.employee.diaChiHienTai,
      diaChiTamTru: state.employee.diaChiTamTru,
      truongDaoTao: state.employee.truongDaoTao,
      chuyenNganh: state.employee.chuyenNganh,
      cv: state.employee.cv,
      nvHopDongLaoDong: state.employee.nvHopDongLaoDong,
      maSoThue: state.employee.maSoThue,
      soNgayPhep: state.employee.soNgayPhep,
      dmVaiTroIds: state.employee.dmVaiTroIds || [],
      listRecruitment: state.recruitment.listRecruitment,
      checkValidate: state.employee.checkValidate || false,
      matKhau: state.employee.matKhau,
      anhDaiDien: state.employee.anhDaiDien,
      taiKhoan: state.employee.taiKhoan,
      ngaySinh: state.employee.ngaySinh && moment(state.employee.ngaySinh),
      mucLuong: state.employee.mucLuong,
      listRole: state.role.listRole || [],
      ma: state.employee.ma,
      listProject: state.project.listProject,
      duAnIds: state.employeeProject.duAnIds,
      duAnIdsCheck: state.employeeProject.duAnIdsCheck,
      trangThai: state.employee.trangThai,
      listSpecialize: state.specialize.listSpecialize,
      listDepartment: state.department.listDepartment,
    };
  },
  ({
    employee: { updateData, getDetail, createOrEdit, onReset },
    recruitment: { loadRecruitment },
    role: { loadRole },
    employeeProject,
    project,
    specialize: { loadSpecialize },
    department: { loadDepartment },
  }) => {
    return {
      createOrEdit,
      updateData,
      getDetail,
      loadRecruitment,
      onReset,
      loadRole,
      loadProject: project.loadProject,
      loadEmployeeProject: employeeProject.loadEmployeeProject,
      updateDataProject: employeeProject.updateData,
      tagsProject: employeeProject.tagsProject,
      onDeleteMore: employeeProject.onDeleteMore,
      loadDepartment,
      loadSpecialize,
    };
  }
)(Employee);
