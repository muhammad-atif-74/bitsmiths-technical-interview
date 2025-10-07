"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";

export type Issue = {
  id: string;
  name: string;
  message: string;
  status: "open" | "resolved";
  numEvents: number;
  numUsers: number;
  value: number;
};

type CheckedState = {
  checked: boolean;
  backgroundColor: string;
};

type TableProps = {
  issues: Issue[];
};

const Table = ({ issues }: TableProps) => {
  // Avoids bugs when issues are filtered or reordered.
  const [checkedState, setCheckedState] = useState<Record<string, CheckedState>>(
    Object.fromEntries(issues.map(({ id }) => [id, { checked: false, backgroundColor: "#ffffff" }]))
  );

  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] =
    useState(false);
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  const handleOnChange = (id: string): void => {
    const updatedState = {
      ...checkedState,
      [id]: {
        checked: !checkedState[id].checked,
        backgroundColor: checkedState[id].checked ? "#ffffff" : "#eeeeee",
      },
    };
    setCheckedState(updatedState);

    const totalSelected = issues.reduce(
      (sum, issue) => sum + (updatedState[issue.id].checked ? issue.value : 0),
      0
    );
    setNumCheckboxesSelected(totalSelected);
  };

  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openCount = issues.filter(i => i.status === "open").length;
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        numCheckboxesSelected > 0 && numCheckboxesSelected < openCount;
    }
  }, [numCheckboxesSelected, issues]);


  // Handles visual indeterminate state for the "Select All" checkbox
  const handleIndeterminateCheckbox = (selectedCount: number): void => {
    const masterCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    ) as HTMLInputElement | null;
    if (!masterCheckbox) return;

    // Count open issues only once
    const openIssuesCount = issues.filter(({ status }) => status === "open").length; // filter for better readibility.

    if (selectedCount === 0) { // descriptive names
      masterCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(false);
    } else if (selectedCount < openIssuesCount) {
      masterCheckbox.indeterminate = true;
      setSelectDeselectAllIsChecked(false);
    } else {
      masterCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(true);
    }
  };


  // Toggles all open issues on Select/Deselect All checkbox click
  const handleSelectDeselectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedState: Record<string, CheckedState> = Object.fromEntries(
      issues.map(({ id, status }) => [
        id,
        {
          checked: checked && status === "open",
          backgroundColor: checked && status === "open" ? "#eeeeee" : "#ffffff",
        },
      ])
    );
    setCheckedState(updatedState);

    const totalSelected = issues.reduce(
      (sum, issue) => sum + (updatedState[issue.id].checked ? issue.value : 0),
      0
    );
    setNumCheckboxesSelected(totalSelected);
    setSelectDeselectAllIsChecked(checked);
  };



  return (
    <table className="w-full border-collapse shadow-lg">
      <thead>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6 text-left w-[48px]">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              id="custom-checkbox-selectDeselectAll"
              name="custom-checkbox-selectDeselectAll"
              value="custom-checkbox-selectDeselectAll"
              checked={selectDeselectAllIsChecked}
              onChange={handleSelectDeselectAll}
            />
          </th>
          <th className="py-6 min-w-[8rem] text-left text-black">
            {numCheckboxesSelected
              ? `Selected ${numCheckboxesSelected}`
              : "None selected"}
          </th>
          <th colSpan={2} />
        </tr>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6" />
          <th className="py-6 text-left font-medium text-black">Name</th>
          <th className="py-6 text-left font-medium text-black">Message</th>
          <th className="py-6 text-left font-medium text-black">Status</th>
        </tr>
      </thead>

      <tbody>
        {issues.map(({ id, name, message, status }, index) => {
          const issueIsOpen = status === "open";
          const onClick = issueIsOpen ? () => handleOnChange(id) : undefined;
          const rowClasses = `${issueIsOpen
            ? "cursor-pointer hover:bg-blue-50 text-black"
            : "text-gray-600 cursor-not-allowed"
            } border-b border-gray-200 ${checkedState[index].checked ? "bg-blue-50" : ""}`;

          return (
            <tr className={rowClasses} key={id} onClick={onClick}>
              <td className="py-6 pl-6">
                {issueIsOpen ? (
                  <input
                    className="w-5 h-5 cursor-pointer"
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index].checked}
                    onChange={() => handleOnChange(index)}
                  />
                ) : (
                  <input className="w-5 h-5 opacity-50" type="checkbox" disabled />
                )}
              </td>
              <td className="py-6">{name}</td>
              <td className="py-6">{message}</td>
              <td className="py-6">
                <div className="flex items-center gap-2">
                  {issueIsOpen ? (
                    <>
                      <span className="inline-block w-[15px] h-[15px] rounded-full bg-blue-600" />
                      <span className="text-blue-700 font-medium">Open</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-[15px] h-[15px] rounded-full bg-gray-400" />
                      <span className="text-gray-700 font-medium">Resolved</span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
};

export default Table;
