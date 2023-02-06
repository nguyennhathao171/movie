import React, { memo, useEffect, useMemo, useRef, useState } from "react";

// function component : không có state, không có lifecycle => dùng giải pháp : react hook

// công dụng react hook :
// 1. cho phép FC có thể sử dụng được state, lifecycle
// 2. cho phép tái sử dụng logic giữa các component với nhau

//danh sách hook
// 1. useState() => thay thế state
// 2. useEffect()
// 3. useCallback() => giải quyết vấn đề của memo, dùng để bọc hàm
// 3.5 memo = pureComponent
// 4. useMemo() => dùng để bọc biến
// 5. useRef()
//    5.1 Dom trong component
//    5.2 chứa giá trị không bị reset lại qua các lần render

const Demo = (props) => {
  const [count, setCount] = useState(0);
  const titleRef = useRef();
  let test1 = useRef(0);
  //
  useEffect(() => {
    console.log("test");
    // clean function : chạy trước khi useEffect chạy lại

    return () => {
      console.log("clean 1");
    };
  }, [count]);
  //
  useEffect(() => {
    console.log("test 2");
    // clean function : chạy trước component unmount
    return () => {
      // same as componentWillUnmount()
    };
  }, []);

  const sum = useMemo(() => {
    console.log("sum init again");
    return 10 + 300 + 10000000 + 20;
  }, []);

  return (
    <div className="bg-green-700">
      <h1 ref={titleRef}>{count}</h1>
      <h1>Sum : {sum}</h1>
      <button
        onClick={() => {
          test1.current = test1.current + 1;
          console.log("test11", test1.current);
          setCount(count + 1);
          titleRef.current.style.color = "yellow";
        }}
      >
        Increase count
      </button>
      <button onClick={props.testMemo}> Test Memo</button>
    </div>
  );
};

export default memo(Demo);
