import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { dataUriToBlob } from "../../utils/createBlob";
import { API_HOST } from "../../env";
import { NotificationPayload } from "../../utils/notificationTypes";

interface Props {
  open: any;
  toggleOpen: () => void;
  displayNotification: (payload: NotificationPayload) => void;
}

export const ChangeUserImageModal = (props: Props) => {
  const auth: AuthState = useContext(AuthContext);
  const [zoom, setZoom] = useState<number>(1);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const size: number = 300;

  useEffect(() => {
    (async () => {
      if (auth.user.profileImage) {
        var response = await fetch(`${API_HOST}${auth.user.profileImage}`);
      } else {
        var response = await fetch(`/default-avatar.png`);
      }

      let data = await response.blob();
      let metadata = {
        type: "image/jpeg",
      };
      let file = new File([data], String(new Date().getTime()), metadata);
      setImage(file);
    })();
  }, []);

  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };

  const onClickSave = () => {
    if (editor) {
      setLoading(true);
      const imageUri = editor.getImage().toDataURL();
      const imageBlob: Blob = dataUriToBlob(imageUri);
      const formData = new FormData();
      formData.append("profile-image", imageBlob);

      auth
        .updateProfileImage({ formData })
        .then((res: any) => {
          setZoom(1);
          setImage(null);
          props.displayNotification({
            color: "success",
            title: "Success",
            description: res.data.message,
          });
          setLoading(false);
          props.toggleOpen();
        })
        .catch((err) => {
          props.displayNotification({
            color: "danger",
            title: "Error",
            description: err.response.data.message,
          });
          setLoading(false);
          props.toggleOpen();
        });
    }
  };

  const setEditorRef = (e: any) => setEditor(e);

  return (
    <Fragment>
      <Modal
        isOpen={props.open}
        toggle={props.toggleOpen}
        className="modal-uploads"
      >
        <ModalHeader toggle={props.toggleOpen}>
          Upload Profile Image
        </ModalHeader>
        <ModalBody className="modal-upload-wrapper">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="modal-file-dropzone">
                <div>
                  <ReactAvatarEditor
                    style={{ zIndex: 10 }}
                    ref={setEditorRef}
                    width={size}
                    height={size}
                    border={0}
                    scale={zoom}
                    borderRadius={size / 2}
                    image={image}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={zoom * 100}
                  style={{ width: size }}
                  onChange={(e) => setZoom(Number(e.target.value) / 100)}
                  onClick={(e) => e.preventDefault()}
                />
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    style={{ width: size }}
                  >
                    Upload Profile Image
                  </button>
                </div>
              </section>
            )}
          </Dropzone>
        </ModalBody>
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            style={{ margin: "auto", width: size }}
            className="btn btn-sm btn-outline-primary"
            onClick={onClickSave}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save Profile Image"}
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
