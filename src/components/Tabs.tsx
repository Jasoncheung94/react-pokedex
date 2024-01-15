import React, { useState, ReactNode } from "react";
import "./Tabs.css";

type TabProps = {
  tabName?: string;
  children: ReactNode;
};

type TabsProps = {
  defaultTab: string;
  children: ReactNode;
};

const Tab = ({ tabName = "", children }: TabProps) => (
  <div className="tab" data-tab={tabName}>
    {children}
  </div>
);

const Tabs = ({ defaultTab, children }: TabsProps) => {
  const tabData = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child, index) => {
      const { tabName = `tab${index + 1}` } = (child.props as TabProps) || {};
      return { tabName, content: child };
    });

  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="tabs">
        <div className="tab-buttons">
          {tabData.map(({ tabName }) => (
            <button
              key={tabName}
              onClick={() => handleTabChange(tabName)}
              className={activeTab === tabName ? "active" : ""}
            ></button>
          ))}
        </div>
      </div>
      <div className="tab-content">
        {tabData
          .filter(({ tabName }) => tabName === activeTab)
          .map(({ tabName, content }) => (
            <div className="tab-content-item" key={tabName}>
              {content}
            </div>
          ))}
      </div>
    </>
  );
};

export { Tabs, Tab };
