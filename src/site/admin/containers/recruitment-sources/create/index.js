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
          title={id ? "C???p nh???t ngu???n tuy???n d???ng" : "Th??m m???i ngu???n tuy???n d???ng"}
          icon={[<i className="fal fa-users-class"></i>]}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-12">
                <Form.Item label="T??n ngu???n tuy???n d???ng*">
                  <Input
                    placeholder="Nh???p t??n ngu???n tuy???n d???ng"
                    value={ten}
                    onChange={(e) => updateData({ ten: e.target.value })}
                  />
                  {checkValidate && !ten ? (
                    <div className="validate">
                      Vui l??ng nh???p t??n ngu???n tuy???n d???ng!
                    </div>
                  ) : null}
                </Form.Item>
              </div>

              <div className="col-6">
                <Form.Item label="S??? ??i???n tho???i*">
                  <Input
                    placeholder="Nh???p s??? di???n tho???i"
                    value={soDienThoai}
                    onChange={(e) => {
                      updateData({ soDienThoai: e.target.value });
                    }}
                  />
                  {checkValidate && !soDienThoai ? (
                    <div className="validate">Vui l??ng nh???p s??? ??i???n tho???i!</div>
                  ) : soDienThoai && !soDienThoai.isPhoneNumber() ? (
                    <div className="validate">
                      Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i!
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Website">
                  <Input
                    placeholder="Nh???p website"
                    value={website}
                    onChange={(e) => updateData({ website: e.target.value })}
                  />
                  {website && !website.isUrl() ? (
                    <div className="validate">
                      Vui l??ng nh???p ????ng ?????nh d???ng link
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Gi??">
                  <Input
                    placeholder="Nh???p gi??"
                    value={soTien ? Number(soTien).formatPrice() : null}
                    onChange={(e) => {
                      formatMoney(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="?????a ch???">
                  <Input
                    placeholder="?????a ch???"
                    value={diaChi}
                    onChange={(e) => {
                      updateData({ diaChi: e.target.value });
                    }}
                  />
                </Form.Item>
                <Form.Item label="Ng?????i li??n h???">
                  <Input
                    placeholder="Nh???p ng?????i li??n h???"
                    value={nguoiLienHe}
                    onChange={(e) =>
                      updateData({ nguoiLienHe: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="S??? l?????ng nh??n vi??n">
                  <Input
                    placeholder="Nh???p s??? l?????ng nh??n vi??n"
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
              H???y
            </Button>
            <Button type="primary" onClick={onSubmit}>
              {id ? "C???p nh???t" : "Th??m m???i"}
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
