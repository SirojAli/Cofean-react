import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMsg } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
  // console.log(data.new_message);
  if (data.new_message.mb_id == verifiedMemberData?._id) {
    return (
      <Box className={"msg_right_box"}>
        <div className={"msg_right"}>{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box className={"msg_left_box"}>
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className={"msg_left"}>{data.new_message.msg}</div>
      </Box>
    );
  }
};

export function CommunityChats() {
  /** INITIALIZATIONS **/
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    console.log("CLIENT>>> connected");
    socket.connect();
    console.log(">>>>>>>>> PRINTED");

    socket?.on("connect", function () {});

    socket?.on("newMsg", (new_message: ChatMsg) => {
      console.log("CLIENT>>> new message");
      messageList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT>>> greet message");
      messageList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT>>> info message");
      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** HANDLERS */
  const getInputMsgHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      console.log("ERROR >>> getKeyHandler ", err);
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first", true);
        return false;
      }

      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_img_url =
        verifiedMemberData?.mb_image ?? "/auth/default_user.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_img_url,
      });
      setMessage("");

      // clean input => send msg to socket
    } catch (err: any) {
      console.log("ERROR >>> onClickHandler ", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className={"chat_frame"}>
      {/* chat top */}
      <Box className={"chat_top"}>
        <div>Jonli Muloqot</div>
        <RippleBadge
          style={{ margin: "-30px 0 0 20px" }}
          badgeContent={onlineUsers}
        />
      </Box>
      {/* chat content */}
      <Stack className={"chat_content"}>
        <Box className={"chat_main"}>
          <Box className={"msg_left_box"}>
            <div className={"msg_left"}>Bu yer jonli muloqot</div>
          </Box>
          {messageList}
        </Box>
      </Stack>
      {/* chat bottom */}
      <Box className={"chat_bottom"}>
        <input
          ref={textInput}
          type="text"
          name={"xabar"}
          className={"msg_input"}
          placeholder={"Xabar jo'natish"}
          onChange={getInputMsgHandler}
          onKeyDown={getKeyHandler}
        />
        <button className={"send_msg_btn"} onClick={onClickHandler}>
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
}
