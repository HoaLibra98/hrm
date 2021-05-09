import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Row, Col, Card, Calendar } from "antd";
import "./style.scss";
import moment from "moment";
function EmployeeInfo(props) {
  const {
    id,
    getDetail,
    ten,
    thoiGianBatDauLamViec,
    email,
    soDienThoai,
    dmChuyenMonId,
    dmBoPhan,
    dmVaiTro,
    qr,
    loadCheckin,
    listCheckin,
    ngaySinh,
    updateData,
    ma,
    listSpecialize,
    loadSpecialize,
    soNgayPhepConLai,
    soNgayDiLamTrongThang,
    soNgayPhepDaNghiTrongThang,
    soNgayDiMuonTrongThang,
  } = props;
  const thoiGianBatDauSearch = props.thoiGianBatDauSearch
    ? moment(props.thoiGianBatDauSearch)
    : moment();
  useEffect(() => {
    updateData({
      thoiGianBatDauSearch: moment(),
    });
    loadSpecialize({ page: 1, size: 1000 });
    getDetail(id);
    loadCheckin({
      page: 1,
      size: 10,
      nhanVienId: id,
      thoiGianBatDauSearch: moment().format("DD-MM-YYYY"),
      thoiGianKetThucSearch: moment().format("DD-MM-YYYY"),
    });
  }, []);
  const getCheckin = () => {
    let lastCheckin = listCheckin[0];
    let { thoiGianBatDau, thoiGianKetThuc } = lastCheckin ? lastCheckin : {};
    if (lastCheckin) {
      return (
        <div>
          <p>
            {thoiGianBatDau
              ? moment(thoiGianBatDau).format("HH:mm:ss")
              : "00:00:00"}
            {" - "}
            {thoiGianKetThuc
              ? moment(thoiGianKetThuc).format("HH:mm:ss")
              : "00:00:00"}
          </p>
          {thoiGianBatDau ? (
            <p>
              <i className="fal fa-check"></i>
              Hôm nay bạn đã checkin
            </p>
          ) : (
            <p>
              {" "}
              <i className="fal fa-times"></i>
              Hôm nay bạn chưa checkin
            </p>
          )}
          {thoiGianKetThuc ? (
            <p>
              <i className="fal fa-check"></i>
              Hôm nay bạn đã checkout
            </p>
          ) : (
            <p>
              {" "}
              <i className="fal fa-times"></i>
              Hôm nay bạn chưa checkout
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <p>00:00:00 - 00:00:00</p>
          <p>
            <i className="fal fa-times"> </i>
            Hôm nay bạn chưa checkin
          </p>

          <p>
            <i className="fal fa-times"> </i>
            Hôm nay bạn chưa checkout
          </p>
        </div>
      );
    }
  };
  const changeDate = (e) => {
    props.updateData({
      thoiGianBatDauSearch: e,
    });
    loadCheckin({
      page: 1,
      size: 10,
      nhanVienId: id,
      thoiGianKetThucSearch: moment(e).format("DD-MM-YYYY"),
      thoiGianBatDauSearch: moment(e).format("YYYY-MM-DD"),
    });
  };
  const getSpecialize = (dmChuyenMonId) => {
    let chuyenMon = listSpecialize.filter((item) => item.id == dmChuyenMonId);
    if (chuyenMon.length) {
      return chuyenMon[0].ten;
    } else {
      return;
    }
  };
  return (
    <>
      <AdminPage
        header="Thông tin nhân viên"
        subheader="Thông tin nhân viên"
        icon="subheader-icon fal fa-window"
      >
        <div className="row">
          <div className="check-in col-md-6">
            <Panel
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-file-alt"></i>]}
            >
              <div className="identity">
                <b>{ten}</b>
                {/* {!!dmVaiTro && !!dmVaiTro.length && (
                  <b>
                    Chức vụ :{" "}
                    {(dmVaiTro || [])
                      .reduce((arr, current) => [...arr, current.ten], [])
                      .join(", ")}
                  </b>
                )} */}
              </div>
              <div className="checkin-out">{getCheckin()}</div>
              {/* <div className="qrCode">
                <img src={qr && qr.absoluteFileUrl()} />
              </div> */}
              <Calendar
                fullscreen={false}
                className="calendar"
                value={thoiGianBatDauSearch}
                onChange={(e) => changeDate(e)}
              />
            </Panel>
          </div>
          <div className="info-employee col-md-6">
            <Panel
              icon={[<i className="fal fa-file-alt"></i>]}
              title="Thông tin nhân viên"
              allowClose={false}
              allowFullScreen={false}
            >
              <Card
                title={
                  <Row>
                    <Col span={12}>
                      <p style={{ fontSize: 34 }}>
                        {soNgayDiLamTrongThang ? soNgayDiLamTrongThang : 0}
                      </p>
                      <p style={{ fontWeight: "normal" }}>Số ngày đi làm</p>
                    </Col>
                    <Col span={12}>
                      <p style={{ fontSize: 34 }}>
                        {soNgayPhepDaNghiTrongThang ? soNgayPhepDaNghiTrongThang : 0}
                      </p>
                      <p style={{ fontWeight: "normal" }}>Số ngày đã nghỉ</p>
                    </Col>
                    <Col span={12}>
                      <p style={{ fontSize: 34 }}>
                        {soNgayPhepConLai ? soNgayPhepConLai : "0"}
                      </p>
                      <p style={{ fontWeight: "normal" }}>Số ngày phép còn</p>
                    </Col>
                    <Col span={12}>
                      <p style={{ fontSize: 34 }}>
                        {soNgayDiMuonTrongThang ? soNgayDiMuonTrongThang : 0}
                      </p>
                      <p style={{ fontWeight: "normal" }}>Số lần đi làm muộn</p>
                    </Col>
                  </Row>
                }
              >
                <div className="employee-infor">
                  <div>
                    <b>Mã nhân viên</b>
                    <p>{ma}</p>
                  </div>
                  <div>
                    <b>Email</b>
                    <p>{email}</p>
                  </div>
                  <div>
                    <b>Số điện thoại</b>
                    <p>{soDienThoai}</p>
                  </div>
                  <div>
                    <b>Ngày sinh</b>
                    <p>
                      {ngaySinh ? moment(ngaySinh).format("DD/MM/YYYY") : null}
                    </p>
                  </div>
                  <div>
                    <b>Bộ phận</b>
                    <p>{dmBoPhan && dmBoPhan.ten}</p>
                  </div>
                  <div>
                    <b>Vị trí chuyên môn</b>
                    <p>{getSpecialize(dmChuyenMonId)}</p>
                  </div>
                  <div>
                    <b>Ngày bắt đầu làm việc</b>
                    <p>
                      {thoiGianBatDauLamViec
                        ? moment(thoiGianBatDauLamViec).format("DD/MM/YYYY")
                        : null}
                    </p>
                  </div>
                </div>
              </Card>
            </Panel>
          </div>
        </div>
      </AdminPage>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    auth: {
      auth: { authorities, id },
    },
    employee: {
      ten,
      thoiGianBatDauLamViec,
      thoiGianKetThucLamViec,
      email,
      soDienThoai,
      dmChuyenMonId,
      dmBoPhan,
      dmVaiTro,
      qr,
      ngaySinh,
      ma,
      soNgayPhepConLai,
      soNgayDiLamTrongThang,
      soNgayPhepDaNghiTrongThang,
      soNgayDiMuonTrongThang,
    },
    checkin: { listCheckin, thoiGianBatDauSearch, thoiGianKetThucSearch },
    specialize: { listSpecialize },
  } = state;
  return {
    authorities,
    id,
    ten,
    thoiGianBatDauLamViec,
    thoiGianKetThucLamViec,
    email,
    soDienThoai,
    dmChuyenMonId,
    dmBoPhan,
    dmVaiTro,
    qr,
    listCheckin,
    thoiGianBatDauSearch: thoiGianBatDauSearch
      ? moment(thoiGianBatDauSearch)
      : null,
    thoiGianKetThucSearch,
    ngaySinh,
    ma,
    listSpecialize,
    soNgayPhepConLai,
    soNgayDiLamTrongThang,
    soNgayPhepDaNghiTrongThang,
    soNgayDiMuonTrongThang,
  };
};
const mapDispatchToProps = ({
  employee: { getDetail },
  checkin: { loadCheckin, updateData },
  specialize: { loadSpecialize },
}) => ({
  getDetail,
  loadCheckin,
  updateData,
  loadSpecialize,
});
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo);
