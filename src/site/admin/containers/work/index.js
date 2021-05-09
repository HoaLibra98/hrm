import React from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";

function index(props) {
  return (
    <>
      {/* <AdminPage
        header="Quản lý lịch đi làm"
        subheader="Quản lý lịch đi làm"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          icon={[<i className="fal fa-calendar-alt"></i>]}
          title="Lịch đi làm"
        >
          <Table></Table>
          <div className="footer">
            <SelectSize />
            <Pagination />
          </div>
        </Panel>
      </AdminPage>
    */}
    </>
  );
}

export default connect()(index);
