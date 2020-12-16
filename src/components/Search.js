import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Button } from "antd";
import axios from "axios";
import ClipboardJS from "clipboard";

const { Search } = Input;

const postUrl = "http://localhost:2001/url";
const deleteUrl = "http://localhost:2001/killall";

const EnterUrl = () => {
  useEffect(() => {
    new ClipboardJS(".anchor");
  }, []);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
    setLoading(true);
    axios
      .get(deleteUrl)
      .then((data) => {
        if (data.status === 200) {
          axios
            .post(postUrl, { url: value })
            .then((data) => {
              setUrl(data.data);
              setLoading(false);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="Enter your localhost IP"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          {loading && "Loading"}
          {!loading && url !== "" ? (
            <Card
              title={
                <>
                  <Row>
                    <Col span={18}>
                      <a href={url} target="_blank" rel="noreferrer">
                        {url}
                      </a>
                    </Col>
                    <Col span={6}>
                      <Button
                        className="anchor"
                        type="primary"
                        data-clipboard-text={url}
                      >
                        Click to copy
                      </Button>
                    </Col>
                  </Row>
                </>
              }
              bordered={false}
            ></Card>
          ) : null}
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export default EnterUrl;
