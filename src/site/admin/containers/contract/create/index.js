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
          title={id ? "Cập nhật hợp đồng" : "THÊM MỚI hợp đồng"}
          icon={[<i className="fal fa-id-card-alt"></i>]}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-6">
                <Form.Item label="Họ và tên nhân viên">
                  <FilterSelect
                    value={nhanVienId}
                    onChange={(e) => updateData({ nhanVienId: e })}
                    listData={listEmployee}
                    searchEmployee
                    checkValidate={checkValidate && !nhanVienId}
                    valueError="Vui lòng nhập tên nhân viên!"
                  />
                </Form.Item>
                <Form.Item label="Loại hợp đồng">
                  <FilterSelect
                    value={dmLoaiHopDongId}
                    onChange={(e) => {
                      updateData({ dmLoaiHopDongId: e });
                    }}
                    listData={listContractType}
                    checkValidate={checkValidate && !dmLoaiHopDongId}
                    valueError="Vui lòng chọn loại hợp đồng!"
                  />
                </Form.Item>
                <Form.Item label="Ngày bắt đầu hợp đồng">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày bắt đầu hợp đồng"
                    value={thoiGianBatDau}
                    onChange={(e) => {
                      updateData({ thoiGianBatDau: e });
                    }}
                  />
                  {checkValidate && !thoiGianBatDau ? (
                    <div className="validate">
                      Vui lòng chọn ngày bắt đầu hợp đồng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="Số hợp đồng">
                  <Input
                    placeholder="Nhập số hợp đồng"
                    value={soHopDong}
                    onChange={(e) => {
                      updateData({ soHopDong: e.target.value });
                    }}
                  />
                  {checkValidate && !soHopDong ? (
                    <div className="validate">Vui lòng nhập số hợp đồng!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ngày ký">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày Ký"
                    value={thoiGianKyHopDong}
                    onChange={(e) => {
                      updateData({ thoiGianKyHopDong: e });
                    }}
                  />
                  {checkValidate && !thoiGianKyHopDong ? (
                    <div className="validate">Vui lòng chọn ngày ký!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ngày kết thúc hợp đồng">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày kết thúc hợp đồng"
                    value={thoiGianKetThuc}
                    onChange={(e) => {
                      updateData({ thoiGianKetThuc: e });
                    }}
                  />
                  {checkValidate && !thoiGianKetThuc ? (
                    <div className="validate">
                      Vui lòng chọn ngày kết thúc hợp đồng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-12 contract-file">
                <Form.Item label="File hợp đồng đính kèm">
                  <ListFile
                    files={dinhKem}
                    provider="contract"
                    types={".doc,.docx,.pdf"}
                    uploadImage={(e) => onChangeImage(e, "file")}
                  />
                  {checkValidate && !dinhKem ? (
                    <div className="validate">
                      Vui lòng chọn file hợp đồng đính kèm!
                    </div>
                  ) : null}
                </Form.Item>
              </div>
            </div>
            <div
              className="button-footer-panel"
            >
              <Button onClick={onCancel} style={{ marginRight: 8 }} className="btn btn-delete">
                Hủy
              </Button>
              <Button type="primary" onClick={onSubmit}>
                {!id ? "Thêm mới" : "Cập nhật"}
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
