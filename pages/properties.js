import Head from "next/head";
import "antd/dist/antd.min.css";
import { Pagination, Menu, Dropdown } from "antd";
import {  DownOutlined } from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/header";
import PropertyGridContainer from "../components/property-grid-container";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

const defaultOrder = [
  {
    key: "1",
    label: (
      <a onClick={(e) => e.preventDefault()}>
        Popular Properties
      </a>
    )
  },
  {
    key: "2",
    label: (
      <a onClick={(e) => e.preventDefault()}>
        Latest Properties
      </a>
    )
  },
  {
    key: "3",
    label: (
      <a onClick={(e) => e.preventDefault()}>
        Recommended Properties
      </a>
    )
  },
]

const PropertiesGridView = () => {
  const client = createClient("https://qsqcteahzhmafzwupmbe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcWN0ZWFoemhtYWZ6d3VwbWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAxMDcyNzYsImV4cCI6MjAwNTY4MzI3Nn0.-0eSjCnyUBX6XcqxEaYL7HjV3jw9J9lvDiD74jWcrXw");
  const [properties, setProperties]= useState ([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const result = await client.from('properties').select("*");
      setProperties(result.data);
    }
    fetchProperties();
  },[])

  return (
    <>
      <Head>
        <title>Real Estate</title>
        <meta name="description" content="Discover your perfect home" />
      </Head>
      <div className="relative bg-gray-white w-full flex flex-col items-start justify-start text-center text-33xl text-gray-white font-body-regular-400">
        <Header hamburger={false} />
        <div className="self-stretch h-60 flex flex-col items-center justify-center bg-[url(/category@3x.png)] bg-cover bg-no-repeat bg-[top]">
          <div className="flex flex-col items-center justify-start gap-[12px]">
            <div className="relative leading-[72px] font-semibold">
              Properties
            </div>
            <div className="relative text-base leading-[24px] text-whitesmoke-200 font-body-regular-600">
              <span>{`Home / `}</span>
              <span className="font-medium text-gray-white">Properties</span>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col pt-16 px-0 pb-2 items-center justify-start gap-[95px] text-left text-base text-gray-black font-body-regular-600 lg:pl-[120px] lg:pr-[120px] lg:box-border md:pl-[60px] md:pr-[60px] md:box-border sm:pl-5 sm:pr-5 sm:box-border">
          <div className="w-[272px] flex flex-row items-center justify-start">
            <div className="flex flex-row items-end justify-start gap-[16px]">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <img
                  className="relative w-6 h-6"
                  alt=""
                  src="/listbullets.svg"
                />
                <img
                  className="relative w-6 h-6"
                  alt=""
                  src="/squaresfour.svg"
                />
              </div>
              <div className="relative leading-[24px]">Sort by:</div>
              <Dropdown
                overlay={
                  <Menu>
                    {[
                      { value: "Popular properties" },
                      { value: "Latest properties" },
                      { value: "Recommended properties" },
                    ].map((option, index) => (
                      <Menu.Item key={index}>
                        <a onClick={(e) => e.preventDefault()}>
                          {option.value || ""}
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomLeft"
                trigger={["hover"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  {`Default Order `}
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
          <PropertyGridContainer allProperties={properties}/>
          <div className="flex flex-row items-end justify-center gap-[8px] text-center text-primary-500">
            <Pagination
              defaultCurrent={1}
              total={50}/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default PropertiesGridView;
