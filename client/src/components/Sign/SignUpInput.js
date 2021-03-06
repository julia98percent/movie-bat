import React, { useState } from "react";
import axios from "axios";
import { CenterWrapper } from "../../styles/theme";
import { Button, Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { signinState } from "../../state";

function SignUpInput({ setIsFirst }) {
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [havePhoneNum, setHavePhoneNum] = useState(true);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  // nickname, email, phoneNum, password
  const [isRightInput, setIsRightInput] = useState(["", "", "", ""]);
  const [isClicked, setIsClicked] = useState(false);
  const setSigninData = useSetRecoilState(signinState);

  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
  const submitSigninData = () => {
    setSigninData([nickname, email, phoneNum, password]);
    setIsFirst(false);
  };
  const emailDupCheck = async () => {
    const response = await axios
      .post(`/auth/signup/id`, {
        email: email,
      })
      .then((res) => res.data);
    console.log(email);
    console.log(response);
  };

  const nickDupCheck = async () => {
    const response = await axios
      .post(`/auth/signup/nick`, {
        nickname: nickname,
      })
      .then((res) => res.data);
    console.log(nickname);
    console.log(response);
  };
  const checkInputValue = () => {
    let newIsRightInput = [false, false, false, false];
    // TODO api 요청하면 수정 필요
    newIsRightInput[0] = true;
    if (regEmail.test(email)) {
      newIsRightInput[1] = true;
    }
    if (
      (havePhoneNum === true && regPhone.test(phoneNum) === true) ||
      havePhoneNum === false
    ) {
      newIsRightInput[2] = true;
    }
    if (password && password === password2) {
      newIsRightInput[3] = true;
    }
    setIsRightInput(newIsRightInput);
  };
  if (
    isRightInput[0] &&
    isRightInput[1] &&
    isRightInput[2] &&
    isRightInput[3]
  ) {
    submitSigninData();
  }
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="emailInput">
          <Form.Label>이메일</Form.Label>

          <div style={{ display: "relative" }}>
            <Form.Control
              style={{ display: "inline" }}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => emailDupCheck()}
              style={{ position: "absolute" }}
            >
              중복 확인
            </Button>
          </div>
          <Form.Text
            className={isClicked && !isRightInput[1] ? "isShown" : "isHidden"}
          >
            이메일 형식을 확인해주세요
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="nicknameInput">
          <Form.Label>닉네임</Form.Label>
          <div style={{ display: "relative" }}>
            <Form.Control
              style={{ display: "inline" }}
              type="text"
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button
              onClick={() => nickDupCheck()}
              style={{ position: "absolute" }}
            >
              중복 확인
            </Button>
          </div>
          <Form.Text
            className={isClicked && !isRightInput[0] ? "isShown" : "isHidden"}
          >
            중복된 닉네임입니다
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumInput">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="tel"
            disabled={!havePhoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          <Form.Check
            type="checkbox"
            label="없음"
            onChange={(e) => setHavePhoneNum(!e.target.checked)}
          />
          <Form.Text
            className={isClicked && !isRightInput[2] ? "isShown" : "isHidden"}
          >
            전화번호 형식을 확인해주세요
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordInput">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordCheckInput">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Form.Text
            className={isClicked && !isRightInput[3] ? "isShown" : "isHidden"}
          >
            {password == null
              ? "비밀번호를 입력해주세요"
              : "비밀번호가 일치하지 않습니다"}
          </Form.Text>
        </Form.Group>
      </Form>
      <CenterWrapper>
        <Button
          className="nextBtn"
          onClick={() => {
            setIsClicked(true);
            checkInputValue();
          }}
        >
          다음
        </Button>
      </CenterWrapper>
    </>
  );
}
export default SignUpInput;
