import React from "react";
import { Link } from "react-router-dom";
// import { useRouter } from 'next/router'
import "./style.scss";
function index(props) {
  // const router = useRouter();
  const getBreadcrumbs = () => {
    let url = (window.location.pathname || "").toLowerCase();
    let obj = [];
    switch (url) {
      case "/":
      case "/dashboard":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/Dashboard",
            name: "Dashboard",
          },
        ];
        break;
      case "/danh-sach-nhan-vien":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Quản lý nhân sự",
          },
          {
            url: "/danh-sach-nhan-su",
            name: "danh sách nhân sự",
          },
        ];
        break;
      case "/danh-sach-bo-phan":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Quản lý nhân sự",
          },
          {
            url: "/danh-sach-bo-phan",
            name: "Danh sách bộ phận",
          },
        ];
        break;
      case "/danh-sach-du-an":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Quản lý nhân sự",
          },
          {
            url: "/danh-sach-du-an",
            name: "Danh sách dự án",
          },
        ];
        break;
      case "/thong-tin-nhan-vien":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/thong-tin-nhan-vien",
            name: "Thông tin nhân viên",
          },
        ];
        break;
      case "/danh-sach-chuyen-mon":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Quản lý nhân sự",
          },
          {
            url: "/danh-sach-chuyen-mon",
            name: "Chuyên môn",
          },
        ];
        break;
      case "/cham-cong-tay":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Lịch làm việc",
          },
          {
            url: "/cham-cong-tay",
            name: "Chấm công tay",
          },
        ];
        break;
      case "/khu-vuc-cham-cong":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Lịch làm việc",
          },
          {
            url: "/khu-vuc-cham-cong",
            name: "Khu vực chấm công",
          },
        ];
        break;
      case "/danh-sach-bao-nghi":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Lịch làm việc",
          },
          {
            url: "/danh-sach-bao-nghi",
            name: "Danh sách báo nghỉ",
          },
        ];
        break;
      case "/danh-sach-hop-dong":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Hợp đồng",
          },
          {
            url: "/danh-sach-bao-nghi",
            name: "Danh sách hợp đồng",
          },
        ];
        break;
      case "/loai-hop-dong":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Hợp đồng",
          },
          {
            url: "/danh-sach-bao-nghi",
            name: "Loại hợp đồng",
          },
        ];
        break;
      case "/nguon-tuyen-dung":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Tuyển dụng",
          },
          {
            url: "/nguon-tuyen-dung",
            name: "Nguồn tuyển dụng",
          },
        ];
        break;
      case "/lich-phong-van":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Tuyển dụng",
          },
          {
            url: "/lich-phong-van",
            name: "Lịch phỏng vấn",
          },
        ];
        break;
      case "/lich-di-lam":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Tuyển dụng",
          },
          {
            url: "/lich-di-lam",
            name: "Lịch đi làm",
          },
        ];
        break;
      case "/danh-sach-ot":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Lịch làm việc",
          },
          {
            url: "danh-sach-ot",
            name: "Danh sách OT",
          },
        ];
        break;
      case "/bao-cao-cham-cong":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "",
            name: "Lịch làm việc",
          },
          {
            url: "bao-cao-cham-cong",
            name: "Báo cáo chấm công",
          },
        ];
        break;
      case "/quan-ly-bao-hiem":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/quan-ly-bao-hiem",
            name: "Quản lý bảo hiểm",
          },
        ];
        break;
      case "/tin-tuc":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/tin-tuc",
            name: "Tin tức",
          },
        ];
        break;
      case "/thong-bao":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/thong-bao",
            name: "Thông báo",
          },
        ];
        break;
      case "/de-xuat-ot":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/de-xuat-ot",
            name: "Đề xuất OT",
          },
        ];
        break;
      case "/de-xuat-nghi-phep":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/de-xuat-nghi-phep",
            name: "Đề xuất nghỉ phép",
          },
        ];
        break;
      case "/danh-sach-vai-tro":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/danh-sach-vai-tro",
            name: "Vai trò & Quyền",
          },
          {
            name: "Vai trò",
          },
        ];
        break;
      case "/danh-sach-quyen":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/danh-sach-quyen",
            name: "Vai trò & Quyền",
          },
          {
            name: "Quyền",
          },
        ];
        break;
      default:
        if (url.indexOf("/nhan-vien/chinh-sua") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Quản lý nhân sự",
            },
            {
              url: "/danh-sach-nhan-vien",
              name: "quản lý nhân viên",
            },
            {
              name: "chỉnh sửa nhân viên",
            },
          ];
        }
        if (url.indexOf("/nhan-vien/them-moi") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Quản lý nhân sự",
            },
            {
              url: "/danh-sach-nhan-vien",
              name: "Quản lý nhân viên",
            },
            {
              name: "Thêm mới nhân viên",
            },
          ];
        }
        if (url.indexOf("/nhan-vien/chi-tiet") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Quản lý nhân sự",
            },
            {
              url: "/danh-sach-nhan-vien",
              name: "Quản lý nhân viên",
            },
            {
              name: "Chi tiết nhân viên",
            },
          ];
        }
        if (url.indexOf("/danh-sach-hop-dong/them-moi") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Hợp đồng",
            },
            {
              url: "/danh-sach-hop-dong",
              name: "Danh sách loại hợp đồng",
            },
            {
              name: "Thêm mới hợp đồng",
            },
          ];
        }
        if (url.indexOf("/danh-sach-hop-dong/chinh-sua") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Hợp đồng",
            },
            {
              url: "/danh-sach-hop-dong",
              name: "Danh sách loại hợp đồng",
            },
            {
              name: "Cập nhật hợp đồng",
            },
          ];
        }
        if (url.indexOf("/nguon-tuyen-dung/chinh-sua") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Tuyển dụng",
            },
            {
              url: "/nguon-tuyen-dung",
              name: "Nguồn tuyển dụng",
            },
            {
              name: "Cập nhật nguồn tuyển dụng",
            },
          ];
        }
        if (url.indexOf("/nguon-tuyen-dung/them-moi") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "",
              name: "Home",
            },
            {
              url: "#",
              name: "Tuyển dụng",
            },
            {
              url: "/nguon-tuyen-dung",
              name: "Nguồn tuyển dụng",
            },
            {
              name: "Thêm mới nguồn tuyển dụng",
            },
          ];
        }
        break;
    }
    return obj;
  };

  // console.log(window.location.pathname);
  const breadCrumb = getBreadcrumbs();
  return (
    <ol className="breadcrumb bg-info-400">
      {breadCrumb.map((item, index) => {
        if (index < breadCrumb.length - 1)
          return (
            <li className="breadcrumb-item" key={index}>
              <Link to={item.url || "#"} className="text-white">
                {item.icon && <i className="fal fa-home mr-1"></i>}
                {item.name}
              </Link>
            </li>
          );
        return (
          <li className="breadcrumb-item active text-white" key={index}>
            {item.name}
          </li>
        );
      })}
    </ol>
  );
}
export default index;
