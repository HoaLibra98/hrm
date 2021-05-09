import React, { useState, useRef, useEffect } from "react";
import { Upload, Button } from "antd";
import fileProvider from "data-access/file-provider";
import snackbar from "utils/snackbar-utils";
// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

export default (props) => {
  const files = useRef([]);
  const [state, _setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: files.current,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useEffect(() => {
    files.current = props.files
      ? [
          {
            status: "done",
            uid: "-1",
            name: props.files,
            url: props.files,
          },
        ]
      : [];
    setState({
      fileList: files.current,
      // hasChange: false,
    });
  }, [props.files]);

  // const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = (file) => {
    window.open(file.url.absoluteFileUrl(), "_blank");
  };

  const handleChange = ({ fileList }) => {};

  const {
    // previewVisible, previewImage,
    fileList,
  } = state;
  const uploadButton = (
    <div>
      <Button className="ant-upload-text">
        <i className="fal fa-cloud-upload"></i> Tải lên
      </Button>
    </div>
  );
  // const onSaveFile = () => {
  //   let url = files.current
  //     .filter((item) => item.status == "done")
  //     .map((item) => item.url);
  //   if (props.onSaveFile) props.onSaveFile(url);
  // };
  return (
    <div className="clearfix">
      <Upload
        fileList={fileList.map((item) => {
          let item2 = {
            uid: item.uid,
            name: item.name,
            url: item.url,
            status: item.status,
            linkProps: '{"download": "image"}',
          };
          if (item2.url) {
            let exts = item2.url.split(".");
            let ext = exts[exts.length - 1].toLowerCase();
            switch (ext) {
              case "doc":
              case "docx":
              case "xlsx":
              case "xls":
              case "ppt":
              case "pptx":
                item2.url = item2.url.absoluteFileUrl();
                break;
              default:
                item2.url = item2.url.absoluteFileUrl();
            }
          }

          return item2;
        })}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => {
          files.current = files.current.filter((item) => item.uid !== file.uid);
          setState({
            fileList: files.current,
            // hasChange: true,
          });
          props.uploadImage("");
        }}
        customRequest={({ onSuccess, onError, file }) => {
          file.status = "uploading";
          files.current.push(file);
          setState({
            fileList: files.current,
            // hasChange: true,
          });
          fileProvider
            .uploadFile(file, props.provider)
            .then((s) => {
              var x = files.current.find((item) => item.uid === file.uid);
              if (x) {
                if (s && s.data.code === 0 && s.data.data.length) {
                  props.uploadImage(s.data.data);
                  let url = s.data.data;
                  x.status = "done";
                  x.url = url;
                } else if (s && s.data.code === 1607) {
                  snackbar.show(
                    s.message || "Chỉ cho phép upload file pdf, docx, doc",
                    "danger"
                  );
                } else {
                  x.status = "error";
                  snackbar.show("upload file không thành công", "danger");
                }
                setState({
                  fileList: files.current,
                  // hasChange: true,
                });
              }
            })
            .catch((e) => {
              var x = files.current.find((item) => item.uid === file.uid);
              if (x) {
                x.status = "error";
                setState({
                  fileList: files.current,
                });
                snackbar.show(
                  e.message || "upload load file không thành công",
                  "danger"
                );
              }
            });
        }}
        // accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.7z,.zip,.pdf,.txt"
        accept={props.types}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {/* {state.hasChange && (
        <Button style={{ marginTop: 20 }} onClick={onSaveFile}>
          Lưu thay đổi
        </Button>
      )} */}
    </div>
  );
};
