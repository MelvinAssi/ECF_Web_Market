import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactDOM from "react-dom";

const Arrow = styled(FontAwesomeIcon)`
  position: fixed;
  font-size: 24px;
  color: var(--color4);
`;

const DropdownMenus = styled.div`
  background-color: var(--color4);
  border-radius: 6px;
  min-width: 150px;
  width: max-content;
  padding: 10px 0;
`;

const DropdownItem = styled.div`
  width: 100%;
  padding: 10px 20px;
  color: var(--color5);
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: var(--color3);
  }
`;

type MenuItem = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  trigger: ReactNode;
  items: MenuItem[];
};

const DropdownMenu = ({ trigger, items }: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [coords, setCoords] = useState<{ top: number, left: number, width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleScroll = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  const updateCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 5,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsDropdownOpen(true);
    updateCoords();
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); 
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </div>

      {isDropdownOpen &&
        ReactDOM.createPortal(
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left - 150 + 32,
              zIndex: 1000,
            }}
          >
            <div style={{ position: "relative" }}>
              <Arrow
                icon={faCaretUp}
                style={{
                  left: `${coords.left + 8}px`,
                  top: `${coords.top - 12}px`,
                }}
              />
              <DropdownMenus>
                {items.map((item, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setIsDropdownOpen(false);
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenus>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export { DropdownMenu };
