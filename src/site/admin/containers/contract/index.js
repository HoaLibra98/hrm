import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Button, DatePicker, Tooltip } from "antd";
import moment from "moment";

function Contract(props) {
  const {
    loadContract,
    listContract,
    page,
    size,
    total,
    updateData,
    loadContractType,
    listContractType,
    dmLoaiHopDongIdSearch,
    onSizeChange,
    onPageChange,
    soHopDongSearch,
    nhanVienIdSearch,
    dmBoPhanIdSearch,
    thoiGianKyHopDongSearch,
    requestTime,
    listDepartment,
    loadDepartment,
    loadEmployee,
    listEmployee,
  } = props;
  useEffect(() => {
    updateData({
      isOpen: false,
      soHopDongSearch: "",
      nhanVienIdSearch: undefined,
      dmBoPhanIdSearch: undefined,
      thoiGianKyHopDongSearch: "",
      dmLoaiHopDongIdSearch: undefined,
    });
    loadContract();
    loadContractType({
      page: 1,
      size: 1000,
    });
    loadDepartment({
      page: 1,
      size: 1000,
    });
    loadEmployee(1);
  }, []);

  let data = listContract.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.soHopDong,
      col3: item.nhanVien ? item.nhanVien.ten : null,
      col4: (item.dmBoPhan || {}).ten,
      col5: item.dmLoaiHopDong ? item.dmLoaiHopDong.ten : null,
      col6: item.dinhKem,
      col7: item.thoiGianKyHopDong
        ? moment(item.thoiGianKyHopDong).format("DD/MM/YYYY")
        : null,
      col8: item,
    };
  });
  const openModal = () => {
    props.history.push(`/danh-sach-hop-dong/them-moi`);
  };
  const editItem = (item) => {
    props.history.push(`/danh-sach-hop-dong/chinh-sua/${item.id}`);
  };
  const onSearch = (e, action) => {
    updateData({
      [action]: e,
    });
    if (requestTime) {
      try {
        clearTimeout(requestTime);
      } catch (error) {}
    }
    let data = setTimeout(() => {
      loadContract();
    }, 500);
    updateData({ requestTime: data });
  };
  return (
    <>
      <AdminPage
        header="Danh sách hợp đồng"
        subheader="Danh sách hợp đồng"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách hợp đồng"
          toolbar={
            <div className="toolbar">
              <Button className="button" onClick={openModal}>
                Thêm mới
              </Button>
            </div>
          }
          icon={[<i className="fal fa-id-card-alt"></i>]}
        >
          <Table
            className="custom"
            style={{ marginLeft: -10, marginRight: -10 }}
            scroll={{ x: 800, y: 500 }}
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
                    <div className="title-box">Số hợp đồng</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          placeholder="tìm theo số hợp đồng"
                          value={soHopDongSearch}
                          onChange={(e) =>
                            onSearch(e.target.value, "soHopDongSearch")
                          }
                        />
                      </div>
                    </div>
                  </div>
                ),
                key: "col2",
                dataIndex: "col2",
                width: 150,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Nhân viên</div>
                    <div className="addition-box">
                      <FilterSelect
                        value={nhanVienIdSearch}
                        onChange={(e) => onSearch(e, "nhanVienIdSearch")}
                        listData={listEmployee}
                        searchEmployee
                        placeholder="Tìm kiếm theo nhân viên"
                      />
                    </div>
                  </div>
                ),
                key: "col3",
                dataIndex: "col3",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Bộ phận</div>
                    <div className="addition-box">
                      <FilterSelect
                        value={dmBoPhanIdSearch}
                        onChange={(e) => onSearch(e, "dmBoPhanIdSearch")}
                        placeholder="Chọn bộ phận"
                        listData={listDepartment}
                      />
                    </div>
                  </div>
                ),
                key: "col4",
                dataIndex: "col4",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Loại hợp đồng</div>
                    <div className="addition-box">
                      <FilterSelect
                        value={dmLoaiHopDongIdSearch}
                        onChange={(e) => onSearch(e, "dmLoaiHopDongIdSearch")}
                        listData={listContractType}
                        placeholder="Tìm kiếm theo hợp đồng"
                      />
                    </div>
                  </div>
                ),
                key: "col5",
                dataIndex: "col5",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">File hợp đồng</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col6",
                dataIndex: "col6",
                width: 250,
                render: (dinhKem) => {
                  return (
                    <a
                      href={dinhKem && dinhKem.absoluteFileUrl()}
                      className="link-file"
                    >
                      {dinhKem}
                    </a>
                  );
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Ngày ký</div>
                    <div className="addition-box">
                      <DatePicker
                        placeholder="Ngày ký"
                        value={thoiGianKyHopDongSearch}
                        format="DD/MM/YYYY"
                        onChange={(e) => onSearch(e, "thoiGianKyHopDongSearch")}
                      />
                    </div>
                  </div>
                ),
                key: "col7",
                dataIndex: "col7",
                width: 150,
                align: "center",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tiện ích</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col8",
                dataIndex: "col8",
                width: 90,
                fixed: "right",
                render: (item) => {
                  return (
                    <div className="col-action">
                      <Tooltip placement="topLeft" title="Sửa">
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                          onClick={() => {
                            editItem(item);
                          }}
                        >
                          <i className="fal fa-edit"></i>
                        </button>
                      </Tooltip>
                    </div>
                  );
                },
              },
            ]}
            dataSource={data}
          ></Table>
          <div className="footer">
            <SelectSize
              value={size}
              selectItem={(e) => onSizeChange(e)}
            ></SelectSize>
            <Pagination
              page={page}
              size={size}
              total={total}
              onPageChange={(e) => onPageChange(e)}
            ></Pagination>
          </div>
        </Panel>
      </AdminPage>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    contract: {
      listContract,
      page,
      size,
      total,
      hoVaTenNhanVien,
      soHopDong,
      dmLoaiHopDong,
      thoiGianKyHopDong,
      ngayBatDau,
      ngayKetThuc,
      id,
      dmLoaiHopDongIdSearch,
      soHopDongSearch,
      nhanVienIdSearch,
      dmBoPhanIdSearch,
      thoiGianKyHopDongSearch,
      requestTime,
    },
    contractType: { listContractType },
    department: { listDepartment },
    employee: { listEmployee },
  } = state;

  return {
    listContract,
    page: page || 1,
    size: size || 10,
    total: total || 0,
    hoVaTenNhanVien,
    soHopDong,
    dmLoaiHopDong,
    thoiGianKyHopDong,
    ngayBatDau,
    ngayKetThuc,
    id,
    listContractType,
    dmLoaiHopDongIdSearch: dmLoaiHopDongIdSearch,
    soHopDongSearch,
    nhanVienIdSearch: nhanVienIdSearch,
    dmBoPhanIdSearch: dmBoPhanIdSearch,
    thoiGianKyHopDongSearch:
      thoiGianKyHopDongSearch && moment(thoiGianKyHopDongSearch),
    requestTime,
    listDepartment,
    listEmployee,
  };
};
const mapDispatchToProps = ({
  contract: { loadContract, updateData, onSizeChange, onPageChange },
  contractType: { loadContractType },
  department: { loadDepartment },
  employee: { loadEmployee },
}) => ({
  loadContract,
  updateData,
  loadContractType,
  onSizeChange,
  onPageChange,
  loadDepartment,
  loadEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(Contract);
