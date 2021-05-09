import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Button, Form, Input } from "antd";

const RecruitmentSources = (props) => {
  const id = props.match.params.id;
  const {
    ten,
    soDienThoai,
    diaChi,
    website,
    nguoiLienHe,
    soTien,
    soLuongNhanVien,
    getDetail,
    updateData,
    createOrEdit,
    checkValidate,
  } = props;
  useEffect(() => {
    updateData({ checkValidate: false, checkAmount: false });
    if (id) {
      getDetail(id).catch((e) => {
        if (e.code === 602) {
          props.history.push("/nguon-tuyen-dung");
        }
      });
    } else {
      updateData({
        ten: "",
        soDienThoai: "",
        diaChi: "",
        website: "",
        nguoiLienHe: "",
        soTien: "",
        soLuongNhanVien: "",
        checkAmount: false,
      });
    }
  }, []);
  const onSubmit = () => {
    let payload = {
      id,
      param: {
        ten,
        soDienThoai,
        diaChi,
        website,
        nguoiLienHe,
        soTien,
        soLuongNhanVien,
      },
    };
    if (
      ten &&
      soDienThoai &&
      soDienThoai.isPhoneNumber() &&
      (website ? website.isUrl() : true)
    ) {
      updateData({ checkValidate: false });
      createOrEdit(payload)
        .then((s) => {
          props.history.push("/nguon-tuyen-dung");
        })
        .catch((e) => {
          if (e.code === 602) props.history.push("/nguon-tuyen-dung");
        });
    } else {
      updateData({ checkValidate: true });
      return;
    }
  };
  const onCancel = () => {
    updateData({
      ten: "",
      soDienThoai: "",
      diaChi: "",
      website: "",
      nguoiLienHe: "",
      soTien: "",
      soLuongNhanVien: "",
    });
    props.history.push("/nguon-tuyen-dung");
  };
  const formatMoney = (value) => {
    let arr = value.split(".");
    let price = "";
    if (value !== "") {
      for (let i = 0; i < arr.length; i++) {
        price += arr[i];
      }
      price = Number(price);
      if (price) {
        updateData({ soTien: price });
      }
    } else {
      updateData({ soTien: "" });
    }
  };
  const employeeAmount = (value) => {
    let check = value.uintTextBox();
    if (check) {
      updateData({ soLuongNhanVien: value, checkAmount: false });
    } else {
      updateData({ checkAmount: true });
    }
  };
  return (
    <>
      <AdminPage>
        <Panel
          title={id ? "Cập nhật nguồn tuyển dụng" : "Thêm mới nguồn tuyển dụng"}
          icon={[<i className="fal fa-users-class"></i>]}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-12">
                <Form.Item label="Tên nguốn tuyển dụng*">
                  <Input
                    placeholder="Nhập tên nguồn tuyển dụng"
                    value={ten}
                    onChange={(e) => updateData({ ten: e.target.value })}
                  />
                  {checkValidate && !ten ? (
                    <div className="validate">
                      Vui lòng nhập tên nguồn tuyển dụng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>

              <div className="col-6">
                <Form.Item label="Số điện thoại*">
                  <Input
                    placeholder="Nhập số diện thoại"
                    value={soDienThoai}
                    onChange={(e) => {
                      updateData({ soDienThoai: e.target.value });
                    }}
                  />
                  {checkValidate && !soDienThoai ? (
                    <div className="validate">Vui lòng nhập số điện thoại!</div>
                  ) : soDienThoai && !soDienThoai.isPhoneNumber() ? (
                    <div className="validate">
                      Vui lòng nhập đúng định dạng số điện thoại!
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Website">
                  <Input
                    placeholder="Nhập website"
                    value={website}
                    onChange={(e) => updateData({ website: e.target.value })}
                  />
                  {website && !website.isUrl() ? (
                    <div className="validate">
                      Vui lòng nhập đúng định dạng link
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Giá">
                  <Input
                    placeholder="Nhập giá"
                    value={soTien ? Number(soTien).formatPrice() : null}
                    onChange={(e) => {
                      formatMoney(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="Địa chỉ">
                  <Input
                    placeholder="Địa chỉ"
                    value={diaChi}
                    onChange={(e) => {
                      updateData({ diaChi: e.target.value });
                    }}
                  />
                </Form.Item>
                <Form.Item label="Người liên hệ">
                  <Input
                    placeholder="Nhập người liên hệ"
                    value={nguoiLienHe}
                    onChange={(e) =>
                      updateData({ nguoiLienHe: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Số lượng nhân viên">
                  <Input
                    placeholder="Nhập số lượng nhân viên"
                    value={soLuongNhanVien}
                    onChange={(e) => {
                      employeeAmount(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="button-footer-panel">
            <Button
              onClick={onCancel}
              style={{ marginRight: 8 }}
              className="btn btn-delete"
            >
              Hủy
            </Button>
            <Button type="primary" onClick={onSubmit}>
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Panel>
      </AdminPage>
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    recruitment: {
      ten,
      soDienThoai,
      diaChi,
      website,
      nguoiLienHe,
      soTien,
      soLuongNhanVien,
      checkValidate,
      checkAmount,
    },
  } = state;
  return {
    ten,
    soDienThoai,
    diaChi,
    website,
    nguoiLienHe,
    soTien,
    soLuongNhanVien,
    checkValidate,
    checkAmount,
  };
};
const mapDispatchToProps = ({
  recruitment: { getDetail, updateData, createOrEdit },
}) => ({ getDetail, updateData, createOrEdit });
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentSources);
