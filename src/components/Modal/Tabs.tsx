import React, { useState } from "react";
import "./Tabs.css";

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button className={`tab ${active ? "active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
};

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab: string;
  setActiveParentTab?: React.Dispatch<React.SetStateAction<string>>;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, setActiveParentTab }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const defaultIndex = tabs.findIndex((tab) => tab.label === defaultTab);
    return defaultIndex !== -1 ? defaultIndex : 0;
  });

  return (
    tabs.length > 0 && (
      <div className="tabs">
        <div className="tab-buttons">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              onClick={() => {
                setActiveTab(index);
                if (setActiveParentTab) {
                  setActiveParentTab(tab.label);
                }
              }}
              active={index === activeTab ? true : false}
            />
          ))}
        </div>
        <div className="tab-content">{tabs[activeTab].content}</div>
      </div>
    )
  );
};

export default Tabs;
