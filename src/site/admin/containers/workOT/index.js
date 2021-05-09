import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip, Form, Input } from "antd";
import snackbar from "utils/snackbar-utils";


function Specialize(props) {
    const {
        listWorkOT,
        loadWorkOT,
        page,
        size,
        updateData,
        deleteItem,
        tenSearch,
        timeRequest,
        total,
        onPageChange,
        onSizeChange,
        id,
        ten,
        ma,
        soTien,
        createOrEdit,
        checkValidate,
    } = props;
    useEffect(() => {
        updateData({
            id: "",
            ten: "",
            ma: "",
            soTien: "",
            checkValidate: false,
            tenSearch: "",
            size: 10,
        });
        loadWorkOT({
            page: page || 1,
            size: size || 10,
        });
    }, []);

    let data = listWorkOT.map((item, index) => {
        return {
            key: item.id,
            col1: (page - 1) * size + index + 1,
            col2: item.ma,
            col3: item.ten,
            col4: item.soTien,
            col5: item,
        };
    });
    const editItem = (item) => {
        updateData({
            ten: item.ten,
            ma: item.ma,
            id: item.id,
            soTien: item.soTien
        });
    };

    const onSearch = (event) => {
        updateData({
            tenSearch: event.target.value,
        });
        if (timeRequest) {
            try {
                clearTimeout(timeRequest);
            } catch (error) { }
        }
        let data = setTimeout(() => {
            loadWorkOT();
        }, 500);
        updateData({
            timeRequest: data,
        });
    };
    const onSubmit = () => {
        let payload = {
            id,
            param: {
                ten,
                ma,
                soTien: +soTien
            },
        };


        if (!ten || !ma || !soTien) {
            updateData({
                checkValidate: true,
            });
            return {};
        } else {
            if ((soTien != 0 && !+soTien) || +soTien < 0) {
                return snackbar.show("Vui lòng nhập số tiền phải là số và >=0 !", "danger");
            }
            updateData({ checkValidate: false });
            createOrEdit(payload).then((s) => { });
        }
    };
    const onCancel = () => {
        updateData({
            ten: "",
            id: "",
            ma: "",
            soTien: ""
        });
    };
    return (
        <>
            <AdminPage
                header="Danh mục làm ngoài giờ"
                subheader="Danh mục làm ngoài giờ"
                icon="subheader-icon fal fa-window"
            >
                <div className="row">
                    <div className="col-8">
                        <Panel
                            title="Danh mục làm ngoài giờ"
                            allowFullScreen={false}
                            allowClose={false}
                            // toolbar={
                            //   <div className="toolbar">
                            //     <Button className="button" onClick={openModal}>
                            //       Thêm mới
                            //     </Button>
                            //   </div>
                            // }
                            icon={[<i className="fal fa-users"></i>]}
                        >
                            <Table
                                style={{ marginLeft: 10, marginRight: -10 }}
                                className="custom"
                                scroll={{ x: 500, y: 500 }}
                                columns={[
                                    {
                                        title: (
                                            <div className="custome-header">
                                                <div className="title-box">STT</div>
                                                <div className="addition-box"></div>
                                            </div>
                                        ),
                                        dataIndex: "col1",
                                        key: "col1",
                                        width: 70,
                                        align: "center",
                                    },
                                    {
                                        title: (
                                            <div className="custome-header">
                                                <div className="title-box">Mã làm ngoài giờ</div>
                                                <div className="addition-box">  </div>
                                            </div>
                                        ),
                                        width: 200,
                                        dataIndex: "col2",
                                        key: "col2",
                                    },
                                    {
                                        title: (
                                            <div className="custome-header">
                                                <div className="title-box">Tên làm ngoài giờ</div>
                                                <div className="addition-box">
                                                    <div className="search-box">
                                                        <img
                                                            src={require("resources/images/icon/ic_search.png")}
                                                            alt=""
                                                        />
                                                        <input
                                                            value={tenSearch}
                                                            onChange={(event) => onSearch(event)}
                                                            placeholder="Tìm theo tên làm ngoài giờ"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        width: 200,
                                        dataIndex: "col3",
                                        key: "col3",
                                        align: "center",
                                    },
                                    {
                                        title: (
                                            <div className="custome-header">
                                                <div className="title-box">Số tiền</div>
                                                <div className="addition-box"></div>
                                            </div>
                                        ),
                                        width: 150,
                                        dataIndex: "col4",
                                        key: "col4",
                                        align: "right",
                                    },
                                    {
                                        title: (
                                            <div className="custome-header">
                                                <div className="title-box">Tiện ích</div>
                                                <div className="addition-box"></div>
                                            </div>
                                        ),
                                        width: 120,
                                        dataIndex: "col5",
                                        key: "col5",
                                        align: "center",
                                        fixed: "right",
                                        render: (item) => {
                                            return (
                                                <div className="col-action">

                                                    <Tooltip placement="topLeft" title="Sửa">
                                                        <button
                                                            className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                                                            onClick={() => editItem(item)}
                                                        >
                                                            <i className="fal fa-edit"></i>
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip placement="topLeft" title={"Xóa"}>
                                                        <button
                                                            className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                                                            onClick={() => deleteItem(item)}
                                                        >
                                                            <i className="fal fa-trash-alt"></i>
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
                    </div>
                    <div className="col-4">
                        <Panel
                            title={id ? "Cập nhật" : "Thêm mới"}
                            allowClose={false}
                            allowFullScreen={false}
                            icon={[<i className="fal fa-users"></i>]}
                        >
                            <Form layout="vertical">
                                <Form.Item label="Mã làm ngoài giờ* ">
                                    <Input
                                        value={ma}
                                        placeholder="Nhập mã làm ngoài giờ"
                                        onChange={(e) => {
                                            updateData({ ma: e.target.value });
                                        }}
                                    />
                                    {checkValidate && !ma ? (
                                        <div style={{ color: "red" }}>
                                            Vui lòng nhập mã làm ngoài giờ!
                                        </div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item label="Tên làm ngoài giờ* ">
                                    <Input
                                        value={ten}
                                        placeholder="Nhập tên làm ngoài giờ"
                                        onChange={(e) => {
                                            updateData({ ten: e.target.value });
                                        }}
                                    />
                                    {checkValidate && !ten ? (
                                        <div style={{ color: "red" }}>
                                            Vui lòng nhập tên làm ngoài giờ!
                                        </div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item label="Số tiền* ">
                                    <Input
                                        value={soTien}
                                        placeholder="Nhập số tiền"
                                        onChange={(e) => {
                                            updateData({ soTien: e.target.value });
                                        }}
                                    />
                                    {checkValidate && !soTien ? (
                                        <div style={{ color: "red" }}>
                                            Vui lòng nhập số tiền!
                                        </div>
                                    ) : null}
                                </Form.Item>
                                <div className="button-footer-panel">
                                    <Button onClick={onCancel} style={{ marginRight: 8 }} className="btn btn-delete">
                                        Hủy
                  </Button>
                                    <Button type="primary" onClick={onSubmit}>
                                        {id ? "Cập nhật" : "Thêm mới"}
                                    </Button>
                                </div>
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
        auth: { auth },
        workOT: {
            listWorkOT,
            page,
            size,
            isOpen,
            tenSearch,
            timeRequest,
            total,
            id,
            ten,
            ma,
            soTien,
            checkValidate,
        },
    } = state;
    return {
        auth,
        listWorkOT,
        page: page || 1,
        size: size || 10,
        isOpen: isOpen || false,
        tenSearch,
        timeRequest,
        total: total || 0,
        id,
        ten,
        ma,
        soTien,
        checkValidate,
    };
};
const mapDispatchToProps = ({
    workOT: {
        loadWorkOT,
        updateData,
        deleteItem,
        onPageChange,
        onSizeChange,
        createOrEdit,
    },
}) => ({
    loadWorkOT,
    updateData,
    deleteItem,
    onPageChange,
    onSizeChange,
    createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps)(Specialize);
