import React, { useEffect, useState } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Button, DatePicker, Form, Input, Tooltip } from "antd";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import DataContants from "config/data-contants";
import { get, isArray } from "lodash";
const { TextArea } = Input;

function OfferOT(props) {
  const {
    onReset,
    loadOT,
    updateData,
    onSizeChange,
    listOT,
    page,
    size,
    lyDo,
    createOrEdit,
    ghiChu,
    checkValidate,
    nhanVienId,
    total,
    ngaySearch,
    timeRequest,
    deleteItem,
    id,
    trangThai,
    loadWorkOT,
    listWorkOT,
    getDateNetwork,
    datetime
  } = props;
  const [hoursItem, setHoursItem] = useState(undefined);
  const chooseItem = (id) => {
    let listWorkOT1 = undefined;
    listWorkOT.map((item) => {
      if (item.id === id) {
        updateData({
          dmLamNgoaiGio: item,
        });
        return listWorkOT1 = item
      }
    });

    setHoursItem(listWorkOT1);
  };
  useEffect(() => {
    onReset();
    loadOT({ page: 1, size: 10, nhanVienId: id });
    loadWorkOT({ page: 0, size: 10000 });
    getDateNetwork();
  }, []);
  const getTypeOT = (id) => {
    let value = '';
    value = listWorkOT.find(item => item.id === id)

    return (value || {}).ten;
  }
  let data = listOT.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: get(item, 'createdAt')
        ? moment(item.createdAt).format("DD/MM/YYYY")
        : null,
      col3: (get(item, 'dmLamNgoaiGioId') || get(item, 'dmLamNgoaiGioId') == 0) && getTypeOT(item.dmLamNgoaiGioId),
      col5: item.trangThai,
      col6: item.lyDo,
      col7: item,
    };
  });
  const onSubmit = () => {
    if ((hoursItem && "id" in hoursItem) && lyDo) {
      let param = {
        dmLamNgoaiGioId: (hoursItem || {}).id,
        dmLamNgoaiGio: hoursItem,
        lyDo,
        ghiChu,
        nhanVienId: id,
      };

      createOrEdit(param).then((s) => {
        if (s && s.code === 0) {
          setHoursItem(undefined);
        }
      });
    } else {
      updateData({ checkValidate: true });
      return;
    }
  };
  const onSearch = (e, item) => {
    updateData({ [item]: e });
    if (timeRequest) {
      try {
        clearTimeout(timeRequest);
      } catch (error) { }
    }
    let data = setTimeout(() => {
      loadOT({ page: 1, size: 10 });
    }, 500);
    updateData({ timeRequest: data });
  };
  const getStatus = (item) => {
    var data = DataContants.listLeave.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
  };
  return (
    <>
      <AdminPage
        header="????? xu???t OT"
        subheader="????? xu???t OT"
        icon="subheader-icon fal fa-window"
      >
        <div className="row custom-offer-ot">
          <div className="col-md-8">
            <Panel
              title="Danh s??ch ????? xu???t OT"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-calendar-plus"></i>]}
            >
              <Table
                style={{ marginLeft: -10, marginRight: -10 }}
                scroll={{ x: 800, y: 500 }}
                className="custom"
                columns={[
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">STT</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 70,
                    dataIndex: "col1",
                    key: "col1",
                    align: "center",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Ng??y OT</div>
                        <div className="addition-box">
                          {/* <DatePicker
                            placeholder="Ng??y OT"
                            value={ngaySearch}
                            onChange={(e) => onSearch(e, "ngaySearch")}
                            format="DD/MM/YYYY"
                          /> */}
                        </div>
                      </div>
                    ),
                    width: 150,
                    dataIndex: "col2",
                    key: "col2",
                  },

                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Lo???i OT</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 150,
                    dataIndex: "col3",
                    key: "col3",
                    align: "center",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tr???ng th??i</div>
                        <div className="addition-box">
                          <FilterSelect
                            onChange={(e) => onSearch(e, "trangThai")}
                            placeholder="Ch???n tr???ng th??i"
                            value={trangThai}
                            listData={DataContants.listLeave}
                          />
                        </div>
                      </div>
                    ),
                    key: "col5",
                    dataIndex: "col5",
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
                    width: 300,
                    dataIndex: "col6",
                    key: "col6",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Ti???n ??ch</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 90,
                    fixed: "right",
                    align: "center",
                    dataIndex: "col7",
                    key: "col7",
                    render: (item) => {
                      return item.trangThai === 0 || item.trangThai === 2 ? (
                        <div className="col-action">
                          <Tooltip placement="topLeft" title={"H???y ????? xu???t"}>
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                              onClick={() => deleteItem(item)}
                            >
                              <i className="fal fa-times"></i>
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                          <div className="col-action">
                            <Tooltip placement="topLeft" title="S???a">
                              <button
                                style={{ cursor: "not-allowed" }}
                                className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                              >
                                <i className="fal fa-check"></i>
                              </button>
                            </Tooltip>
                          </div>
                        );
                    },
                  },
                ]}
                dataSource={data}
              />
              <div className="footer">
                <SelectSize value={size} selectItem={(e) => onSizeChange(e)} />
                <Pagination
                  size={size}
                  page={page}
                  total={total}
                  onPageChange={(e) => {
                    updateData({ page: e });
                    loadOT({ page: e, size: size });
                  }}
                />
              </div>
            </Panel>
          </div>
          <div className="col-md-4 custome-panel">
            <Panel
              // title="Th??m m???i"
              toolbar={
                <div className="toolbar">
                  <Button className="button" onClick={onSubmit}>
                    <span>Th??m ????? xu???t OT</span>
                  </Button>
                </div>
              }
              icon={[<i className="fal fa-calendar-plus"></i>]}
              allowClose={false}
              allowFullScreen={false}
            >
              <Form layout="vertical">
                <Form.Item label="Ng??y OT">
                  <div style={{ borderWidth: 1, borderColor: "#d9d9d9", borderStyle: "solid", borderRadius: 5, padding: 5, }}>
                    {(datetime && moment(datetime).format("DD/MM/YYYY")) || moment().format("DD/MM/YYYY")}
                  </div>
                </Form.Item>
                <Form.Item label="Danh m???c OT(*):">
                  <FilterSelect
                    onChange={(e) => chooseItem(e)}
                    placeholder="Ch???n lo???i danh m???c OT"
                    value={get(hoursItem, "ten")}
                    listData={listWorkOT}
                  />
                  {/* <div className="ot-hours">
                    {isArray(listWorkOT) && listWorkOT.length > 0 &&
                      listWorkOT.map((item) => {
                        return (
                          <div className="button-inner" key={(item || {}).id}>
                            <Button
                              onClick={() => {
                                chooseItem((item || {}).id);
                              }}
                              key={(item || {}).id}
                            >
                              {get(item, "ten")}
                            </Button>
                            {(item || {}).id == (hoursItem || {}).id ? (
                              <img
                                src={require("resources/images/notification/group.png")}
                                alt=""
                              />
                            ) : null}
                          </div>
                        );
                      })}
                  </div> */}
                  {checkValidate && !get(hoursItem, "id") ? (
                    <div className="validate">Vui l??ng ch???n lo???i danh m???c OT!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="L?? do OT*">
                  <TextArea
                    placeholder="L?? do OT"
                    onChange={(e) => {
                      updateData({ lyDo: e.target.value });
                    }}
                    value={lyDo}
                  />
                  {checkValidate && !lyDo ? (
                    <div className="validate">Vui l??ng nh???p l?? do!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ghi ch??">
                  <TextArea
                    placeholder="Ghi ch??"
                    value={ghiChu}
                    onChange={(e) => {
                      updateData({ ghiChu: e.target.value });
                    }}
                  />
                </Form.Item>
                <p>Note: L???ch ngh??? n??y s??? ???????c g???i cho leader v?? Hr</p>
                {/* <div>
                  <Button className="button" type="primary" onClick={onSubmit}>
                    Th??m m???i
                  </Button>
                </div> */}
              </Form>
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
      auth: { id },
    },
    ot: {
      listOT = [],
      page = 1,
      size,
      trangThai,
      thoiGianBatDau,
      thoiGianKetThuc,
      checkValidate,
      lyDo,
      ghiChu,
      total,
      otHours,
      ngaySearch,
      timeRequest,
      nhanVienId,
    },
    workOT: {
      listWorkOT = [],
    },
    dateTimeOnl: {
      datetime
    },
  } = state;
  return {
    listOT,
    page,
    size,
    trangThai,
    thoiGianKetThuc: thoiGianKetThuc ? moment(thoiGianKetThuc) : null,
    thoiGianBatDau: thoiGianBatDau ? moment(thoiGianBatDau) : null,
    checkValidate,
    lyDo,
    ghiChu,
    nhanVienId,
    total,
    otHours,
    ngaySearch: ngaySearch ? moment(ngaySearch) : null,
    timeRequest,
    id,
    listWorkOT,
    datetime
  };
};
const mapDispatchToProps = ({
  ot: {
    loadOT,
    updateData,
    onSizeChange,
    createOrEdit,
    deleteItem,
    onReset,
  },
  workOT: {
    loadWorkOT,
  },
  dateTimeOnl
}) => {
  return {
    loadOT,
    updateData,
    onSizeChange,
    createOrEdit,
    deleteItem,
    onReset,
    loadWorkOT,
    getDateNetwork: dateTimeOnl.getDateNetwork,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OfferOT);
