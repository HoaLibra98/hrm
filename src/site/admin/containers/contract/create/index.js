import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { FilterSelect } from "site/admin/components/common";
import { Button, DatePicker, Form, Input } from "antd";
import ListFile from "site/admin/components/device/ListFile";
import moment from "moment";

function Contract(props) {
  const id = props.match.params.id;
  const {
    soHopDong,
    thoiGianKyHopDong,
    thoiGianBatDau,
    thoiGianKetThuc,
    updateData,
    createOrEdit,
    getDetail,
    loadContractType,
    listContractType,
    dinhKem,
    checkValidate,
    loadEmployee,
    nhanVienId,
    listEmployee,
    dmLoaiHopDongId,
    dmBoPhanId,
  } = props;
  useEffect(() => {
    loadEmployee();
    updateData({
      checkValidate: false,
    });
    loadContractType({ size: 1000, page: 1 });
    if (id) {
      getDetail(id).catch((e) => {
        if (e.code === 602) {
          props.history.push("/danh-sach-hop-dong");
        }
      });
    } else {
      updateData({
        nhanVienId: "",
        soHopDong: "",
        dmLoaiHopDongId: "",
        thoiGianKyHopDong: "",
        thoiGianBatDau: "",
        thoiGianKetThuc: "",
        dinhKem: "",
        dmBoPhanId: "",
      });
    }
  }, []);
  const onCancel = () => {
    updateData({
      checkValidate: false,
      nhanVienId: "",
      soHopDong: "",
      dmLoaiHopDongId: "",
      thoiGianKyHopDong: "",
      thoiGianBatDau: "",
      thoiGianKetThuc: "",
      dinhKem: "",
      dmBoPhanId: "",
    });
    props.history.push("/danh-sach-hop-dong");
  };
  const onSubmit = () => {
    let payload = {
      id,
      param: {
        nhanVienId,
        soHopDong,
        dmLoaiHopDongId,
        thoiGianKyHopDong,
        thoiGianBatDau,
        thoiGianKetThuc,
        dinhKem,
        dmBoPhanId,
      },
    };
    if (
      nhanVienId &&
      soHopDong &&
      dmLoaiHopDongId &&
      thoiGianKyHopDong &&
      thoiGianBatDau &&
      thoiGianKetThuc &&
      dinhKem
    ) {
      updateData({ checkValidate: false });
      createOrEdit(payload)
        .then((s) => {
          props.history.push("/danh-sach-hop-dong");
        })
        .catch((e) => {
          if (e.code === 602) {
            props.history.push("/danh-sach-hop-dong");
          }
        });
    } else {
      updateData({
        checkValidate: true,
      });
    }
  };
  const onChangeImage = (e) => {
    updateData({ dinhKem: e });
  };
  return (
    <>
      <AdminPage>
        <Panel
          title={id ? "C???p nh???t h???p ?????ng" : "TH??M M???I h???p ?????ng"}
          icon={[<i className="fal fa-id-card-alt"></i>]}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-6">
                <Form.Item label="H??? v?? t??n nh??n vi??n">
                  <FilterSelect
                    value={nhanVienId}
                    onChange={(e) => updateData({ nhanVienId: e })}
                    listData={listEmployee}
                    searchEmployee
                    checkValidate={checkValidate && !nhanVienId}
                    valueError="Vui l??ng nh???p t??n nh??n vi??n!"
                  />
                </Form.Item>
                <Form.Item label="Lo???i h???p ?????ng">
                  <FilterSelect
                    value={dmLoaiHopDongId}
                    onChange={(e) => {
                      updateData({ dmLoaiHopDongId: e });
                    }}
                    listData={listContractType}
                    checkValidate={checkValidate && !dmLoaiHopDongId}
                    valueError="Vui l??ng ch???n lo???i h???p ?????ng!"
                  />
                </Form.Item>
                <Form.Item label="Ng??y b???t ?????u h???p ?????ng">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Ch???n ng??y b???t ?????u h???p ?????ng"
                    value={thoiGianBatDau}
                    onChange={(e) => {
                      updateData({ thoiGianBatDau: e });
                    }}
                  />
                  {checkValidate && !thoiGianBatDau ? (
                    <div className="validate">
                      Vui l??ng ch???n ng??y b???t ?????u h???p ?????ng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="S??? h???p ?????ng">
                  <Input
                    placeholder="Nh???p s??? h???p ?????ng"
                    value={soHopDong}
                    onChange={(e) => {
                      updateData({ soHopDong: e.target.value });
                    }}
                  />
                  {checkValidate && !soHopDong ? (
                    <div className="validate">Vui l??ng nh???p s??? h???p ?????ng!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ng??y k??">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Ch???n ng??y K??"
                    value={thoiGianKyHopDong}
                    onChange={(e) => {
                      updateData({ thoiGianKyHopDong: e });
                    }}
                  />
                  {checkValidate && !thoiGianKyHopDong ? (
                    <div className="validate">Vui l??ng ch???n ng??y k??!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ng??y k???t th??c h???p ?????ng">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Ch???n ng??y k???t th??c h???p ?????ng"
                    value={thoiGianKetThuc}
                    onChange={(e) => {
                      updateData({ thoiGianKetThuc: e });
                    }}
                  />
                  {checkValidate && !thoiGianKetThuc ? (
                    <div className="validate">
                      Vui l??ng ch???n ng??y k???t th??c h???p ?????ng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-12 contract-file">
                <Form.Item label="File h???p ?????ng ????nh k??m">
                  <ListFile
                    files={dinhKem}
                    provider="contract"
                    types={".doc,.docx,.pdf"}
                    uploadImage={(e) => onChangeImage(e, "file")}
                  />
                  {checkValidate && !dinhKem ? (
                    <div className="validate">
                      Vui l??ng ch???n file h???p ?????ng ????nh k??m!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
            </div>
            <div
              className="button-footer-panel"
            >
              <Button onClick={onCancel} style={{ marginRight: 8 }} className="btn btn-delete">
                H???y
              </Button>
              <Button type="primary" onClick={onSubmit}>
                {!id ? "Th??m m???i" : "C???p nh???t"}
              </Button>
            </div>
          </Form>
        </Panel>
      </AdminPage>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    contract: {
      nhanVienId,
      soHopDong,
      thoiGianKyHopDong,
      thoiGianBatDau,
      thoiGianKetThuc,
      dinhKem,
      checkValidate,
      dmLoaiHopDongId,
      dmBoPhanId,
    },
    contractType: { listContractType },
    employee: { listEmployee },
  } = state;
  return {
    nhanVienId: nhanVienId || null,
    soHopDong,
    thoiGianKyHopDong: thoiGianKyHopDong ? moment(thoiGianKyHopDong) : null,
    thoiGianBatDau: thoiGianBatDau ? moment(thoiGianBatDau) : null,
    thoiGianKetThuc: thoiGianKetThuc ? moment(thoiGianKetThuc) : null,
    listContractType,
    dinhKem,
    checkValidate,
    listEmployee,
    dmLoaiHopDongId: dmLoaiHopDongId || null,
    dmBoPhanId,
  };
};
const mapDispatchToProps = ({
  contract: { updateData, createOrEdit, getDetail },
  contractType: { loadContractType },
  employee: { loadEmployee },
}) => ({
  updateData,
  createOrEdit,
  getDetail,
  loadContractType,
  loadEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(Contract);
