import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Button, Tooltip, Form, Radio, Input, DatePicker } from "antd";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import moment from "moment";
import "./style.scss";
import DataContants from "config/data-contants";
import { get, isArray } from "lodash";
import dayOff from "../../../../redux-store/models/dayOff";
const { TextArea } = Input;
function OfferLeave(props) {
  const {
    trangThai,
    listDayOff,
    loadDayOff,
    page,
    size,
    updateData,
    createOrEdit,
    auth,
    loaiNgayNghi,
    thoiGianNghi,
    thoiGianBatDau,
    thoiGianKetThuc,
    lyDo,
    checkValidate,
    onReset,
    requestTimeout,
    ngayNghi,
    total,
    getTypeDayOff,
    listTypeDayOff
  } = props;
  const today = moment();
  const [dateValue, setDateValue] = useState(moment.range(today, today));
  useEffect(() => {
    onReset();
    updateData({
      thoiGianBatDau: moment(today.clone()).format("YYYY-MM-DD"),
      thoiGianKetThuc: moment(today.clone()).format("YYYY-MM-DD"),
    });
    const param = {
      page: 1,
      size: size,
      nhanVienId: auth && auth.id,
    };
    loadDayOff(param);
    getTypeDayOff();
  }, []);

  const filterDayOff = (value) => {
    let data = {};
    (value || value == 0) && isArray(listTypeDayOff) &&
      listTypeDayOff.length > 0 &&
      listTypeDayOff.map(dayOff => {
        if (dayOff.value == value) {
          data = dayOff;
        }
      })

    return (data || {}).name || '';
  }

  let data = (listDayOff || []).map((item, index) => {
    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: item.ngayNghi && moment(item.ngayNghi).format("DD/MM/YYYY"),
      col3: item.soLuong,
      col4: item.trangThai,
      col5: item.lyDo,
      col6: item,
      col7: (get(item, "loaiNgayNghi") || get(item, "loaiNgayNghi") == 0) && filterDayOff(item.loaiNgayNghi),
    };
  });

  const onSizeChange = (size) => {
    updateData({
      nhanVienId: auth && auth.id,
      page: 1,
    });
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      nhanVienId: auth && auth.id,
      page,
    });
    props.loadDayOff({ page, size: size });
  };
  const onSelect = (value, states) => {
    setDateValue(value);
    updateData({
      thoiGianBatDau: value && moment(value.start).format("YYYY-MM-DD"),
      thoiGianKetThuc: value && moment(value.end).format("YYYY-MM-DD"),
    });
  };
  const onDelete = (item) => {
    props.onDelete(item);
  };
  const handleSubmit = () => {
    const param = {
      loaiNgayNghi: loaiNgayNghi,
      thoiGianNghi: thoiGianNghi,
      thoiGianBatDau: thoiGianBatDau,
      thoiGianKetThuc: thoiGianKetThuc,
      lyDo: lyDo,
      nhanVienId: auth && auth.id,
    };
    if (!lyDo) {
      updateData({
        checkValidate: true,
      });
      return;
    } else {
      createOrEdit(param).then((s) => {
        if (s && s.code === 0) {
          setDateValue(moment.range(today, today));
        }
      });
    }
  };
  const onSearch = (e, item) => {
    updateData({
      [item]: e,
      nhanVienId: auth && auth.id,
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) { }
    }
    let data = setTimeout(() => loadDayOff({ page: 1 }), 500);
    updateData({
      requestTimeout: data,
    });
  };
  const getStatus = (item) => {
    var data = DataContants.listLeave.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
  };
  return (
    <AdminPage
      header="????? xu???t ngh??? ph??p"
      subheader="????? xu???t ngh??? ph??p"
      icon="subheader-icon fal fa-window"
    >
      <div className="row custome-news">
        <div className="col-md-8">
          <Panel
            title="????? xu???t ngh??? ph??p"
            allowClose={false}
            allowFullScreen={false}
            icon={[<i className="fal fa-calendar-minus"></i>]}
          >
            <Table
              className="custom"
              scroll={{ x: 800, y: 500 }}
              style={{ marginLeft: -10, marginRight: -10 }}
              columns={[
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">STT</div>
                      <div className="addition-box"></div>
                    </div>
                  ),
                  key: "col1",
                  dataIndex: "col1",
                  width: 100,
                  align: "center",
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Ng??y ngh???</div>
                      <div className="addition-box">
                        <DatePicker
                          placeholder="t??m theo ng??y ngh???"
                          onChange={(e) => {
                            onSearch(e, "ngayNghi");
                          }}
                          value={ngayNghi && moment(ngayNghi)}
                          format="DD/MM/YYYY"
                        />
                      </div>
                    </div>
                  ),
                  key: "col2",
                  dataIndex: "col2",
                  align: "center",
                  width: 150,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">T???ng s??? ng??y ngh???</div>
                      <div className="addition-box"></div>
                    </div>
                  ),
                  key: "col3",
                  dataIndex: "col3",
                  align: "center",
                  width: 170,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Tr???ng th??i</div>
                      <div className="addition-box">
                        <FilterSelect
                          onChange={(e) => {
                            onSearch(e, "trangThai");
                          }}
                          placeholder="Ch???n tr???ng th??i"
                          value={trangThai}
                          listData={DataContants.listLeave}
                        />
                      </div>
                    </div>
                  ),
                  key: "col4",
                  dataIndex: "col4",
                  align: "center",
                  width: 150,
                  render: (item) => {
                    return <>{item !== null && getStatus(item).ten}</>;
                  },
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">L?? do</div>
                      <div className="addition-box"></div>
                    </div>
                  ),
                  key: "col5",
                  dataIndex: "col5",
                  width: 200,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Lo???i ng??y ngh???</div>
                      <div className="addition-box"></div>
                    </div>
                  ),
                  key: "col7",
                  dataIndex: "col7",
                  width: 200,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Ti???n ??ch</div>
                      <div className="addition-box"></div>
                    </div>
                  ),
                  key: "col6",
                  dataIndex: "col6",
                  align: "center",
                  width: 90,
                  fixed: "right",
                  render: (item) => {
                    return item.trangThai === 0 || item.trangThai === 2 ? (
                      <div className="col-action">
                        <Tooltip placement="topLeft" title={"H???y ph??p"}>
                          <button
                            className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                            onClick={() => {
                              onDelete(item);
                            }}
                          >
                            <i className="fal fa-times"></i>
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                        <div className="col-action">
                          <Tooltip placement="topLeft" title={"???? duy??t"}>
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                              style={{ cursor: "not-allowed" }}
                            >
                              <i className="fal fa-check"></i>
                            </button>
                          </Tooltip>
                        </div>
                      );
                  },
                },
              ]}
              dataSource={data || []}
            ></Table>
            <div className="footer">
              <SelectSize value={size} selectItem={onSizeChange} />
              <Pagination
                onPageChange={onPageChange}
                page={page}
                size={size}
                total={total}
                style={{ flex: 1, justifyContent: "flex-end" }}
              ></Pagination>
            </div>
          </Panel>
        </div>
        <div className="col-md-4 custome-panel">
          <Panel
            toolbar={
              <div className="toolbar">
                <Button className="button" onClick={() => handleSubmit()}>
                  Th??m ????? xu???t ngh??? ph??p
                </Button>
              </div>
            }
            icon={[<i className="fal fa-calendar-minus"></i>]}
            allowClose={false}
            allowFullScreen={false}
          >
            <Form layout="vertical">
              <Form.Item>
                <DateRangePicker
                  value={dateValue}
                  onSelect={onSelect}
                  singleDateRange={true}
                  minimumDate={new Date()}
                />
              </Form.Item>
              <Form.Item>
                <Radio.Group
                  value={props.thoiGianNghi}
                  onChange={(e) => {
                    updateData({
                      thoiGianNghi: e.target.value,
                    });
                  }}
                >
                  <Radio value={0}>C??? ng??y</Radio>
                  <Radio value={1}>S??ng</Radio>
                  <Radio value={2}>Chi???u</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Radio.Group
                  value={props.loaiNgayNghi}
                  onChange={(e) => {
                    updateData({
                      loaiNgayNghi: e.target.value,
                    });
                  }}
                >
                  {isArray(listTypeDayOff) && listTypeDayOff.length > 0 &&
                    listTypeDayOff.map((item, index) => {
                      return <Radio key={index} value={(item || {}).value}>{(item || {}).name}</Radio>
                    })
                  }
                  {/* <Radio value={0}>Ngh??? ph??p</Radio>
                  <Radio value={1}>Ngh??? kh??ng ph??p</Radio> */}
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <TextArea
                  placeholder="L?? do (*)"
                  onChange={(e) => {
                    updateData({
                      lyDo: e.target.value,
                    });
                  }}
                  value={lyDo}
                />
                {checkValidate && !lyDo ? (
                  <div className="error">Vui l??ng nh???p l?? do ????? xu???t ngh???</div>
                ) : null}
              </Form.Item>
            </Form>
            <div>
              <b>
                <i>Note: L???ch ngh??? n??y s??? ???????c g???i cho leader v?? Hr</i>
              </b>
            </div>
          </Panel>
        </div>
      </div>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    const {
      dayOff: {
        listDayOff = [],
        listTypeDayOff = [],
        page = 1,
        size,
        loaiNgayNghi,
        thoiGianKetThuc,
        thoiGianBatDau,
        thoiGianNghi,
        lyDo,
        checkValidate,
        requestTimeout,
        ngayNghi,
        trangThai,
        total,
      },
      auth: { auth },
    } = state;
    return {
      listDayOff,
      listTypeDayOff,
      page,
      size,
      loaiNgayNghi,
      thoiGianNghi,
      thoiGianBatDau,
      thoiGianKetThuc,
      lyDo,
      checkValidate,
      auth,
      requestTimeout,
      ngayNghi,
      trangThai,
      total,
    };
  },
  ({
    dayOff: {
      loadDayOff,
      updateData,
      onSizeChange,
      createOrEdit,
      onDelete,
      onReset,
      getTypeDayOff
    },
  }) => {
    return {
      loadDayOff,
      onReset,
      updateData,
      onSizeChange,
      createOrEdit,
      onDelete,
      getTypeDayOff
    };
  }
)(OfferLeave);
