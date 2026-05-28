import { useState } from "react";

// ─── SMILY DESIGN TOKENS ─────────────────────────────────────────────────────

const tokens = {
  colors: {
    // Brand
    primary: "#1DC8CA",
    primaryGradient: "linear-gradient(82.58deg, #04969D 15.234%, #1DC8CA 241.16%)",
    secondary: "#FF27D7",

    // Status
    success: "#3DB559",
    error: "#E74C3C",
    warning: "#FD8B07",
    info: "#199BD9",

    // Gray scale
    gray50:  "#f6f7f9",
    gray100: "#ecedf2",
    gray200: "#d4d8e3",
    gray300: "#aeb6cb",
    gray400: "#828fae",
    gray500: "#627093",
    gray600: "#4e5a7b",
    gray700: "#404964",
    gray800: "#383f54",
    gray900: "#323748",
    gray950: "#212430",

    // Text
    headingColor: "#152536",
    bodyColor:    "#6B7176",
    dark:         "#343A40",
    white:        "#FFFFFF",
  },
  fonts: {
    // Figma DS: Sofia Pro — web prototype substitute: Mulish
    heading: "'Mulish', sans-serif",
    body:    "'Open Sans', sans-serif",
  },
  radii: {
    xs:   "2.5px",
    sm:   "5px",
    md:   "10px",
    lg:   "20px",
    xl:   "40px",
    pill: "1000px",
  },
  spacing: {
    0: "0px",
    1: "2px",
    2: "4px",
    3: "8px",
    4: "12px",
    5: "16px",
    6: "20px",
    7: "24px",
    8: "32px",
  },
  shadows: {
    card:       "0px 2px 9px rgba(0,0,0,0.10)",
    cardStrong: "2px 4px 20px rgba(0,0,0,0.10)",
    cardWide:   "0px 4px 40px rgba(0, 0, 0, 0.10)",
    inner:      "inset -1px 0px 12px rgba(0, 0, 0, 0.04)",
  },
};

// ─── BUTTON COMPONENTS ───────────────────────────────────────────────────────

function ButtonSolid({ children = "Button", size = "M", disabled = false, loading = false, leadingIcon, trailingIcon, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: tokens.colors.white,
        background: disabled ? tokens.colors.gray300 : tokens.tokens?.primaryGradient || "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
        transition: "opacity 0.15s, filter 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(0.92)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
    >
      {leadingIcon && <span style={{ display: "flex", alignItems: "center" }}>{leadingIcon}</span>}
      {loading ? <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: "50%", background: "white",
            animation: `bounce 0.9s ${i * 0.2}s infinite`,
          }} />
        ))}
      </span> : children}
      {trailingIcon && <span style={{ display: "flex", alignItems: "center" }}>{trailingIcon}</span>}
    </button>
  );
}

function ButtonOutline({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: `1px solid ${disabled ? tokens.colors.gray200 : tokens.colors.gray300}`,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray300 : tokens.colors.gray500,
        background: tokens.colors.white,
        transition: "border-color 0.15s, background 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = tokens.colors.gray500; e.currentTarget.style.background = tokens.colors.gray50; }}}
      onMouseLeave={e => { e.currentTarget.style.borderColor = tokens.colors.gray300; e.currentTarget.style.background = tokens.colors.white; }}
    >
      {children}
    </button>
  );
}

function ButtonTonal({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray400 : tokens.colors.primary,
        background: disabled ? tokens.colors.gray100 : "rgba(29, 200, 202, 0.12)",
        transition: "background 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(29, 200, 202, 0.2)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "rgba(29, 200, 202, 0.12)"; }}
    >
      {children}
    </button>
  );
}

function ButtonText({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        fontSize: size === "S" ? "13px" : "14px",
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray300 : tokens.colors.primary,
        background: "transparent",
        padding: size === "S" ? "8px 4px" : "12px 4px",
        minWidth: "unset",
        textDecoration: "none",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.textDecoration = "underline"; }}
      onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
    >
      {children}
    </button>
  );
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────

function InputField({
  label,
  placeholder = "Search",
  helperText,
  state = "default", // default | focused | error | disabled
  value,
  onChange,
  maxLength,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFocused = focused && !isDisabled;

  const borderColor = isError
    ? tokens.colors.error
    : isFocused
    ? tokens.colors.primary
    : tokens.colors.gray400;

  const borderWidth = isError || isFocused ? "1.5px" : "1px";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "72px", width: "100%" }}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: "2px", paddingBottom: "4px" }}>
          <label style={{
            fontFamily: tokens.fonts.body,
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: tokens.colors.gray600,
          }}>{label}</label>
        </div>
      )}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "45px",
        padding: "12px 8px",
        borderRadius: tokens.radii.sm,
        border: `${borderWidth} solid ${borderColor}`,
        background: isDisabled ? tokens.colors.gray100 : tokens.colors.gray50,
        transition: "border-color 0.15s",
        boxSizing: "border-box",
      }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontFamily: tokens.fonts.body,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: isDisabled ? tokens.colors.gray400 : tokens.colors.gray700,
            outline: "none",
            width: "100%",
          }}
        />
      </div>
      {(helperText || maxLength) && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: tokens.fonts.body,
          fontSize: "12px",
          lineHeight: 1.5,
        }}>
          {helperText && (
            <span style={{ color: isError ? "#d53d2d" : tokens.colors.gray600 }}>{helperText}</span>
          )}
          {maxLength && value !== undefined && (
            <span style={{ color: tokens.colors.gray400, marginLeft: "auto" }}>{value.length}/{maxLength}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COLOR SWATCH ────────────────────────────────────────────────────────────

function Swatch({ name, hex, large = false }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      title={`Copy ${hex}`}
    >
      <div style={{
        width: large ? 80 : 56,
        height: large ? 48 : 36,
        borderRadius: "6px",
        background: hex,
        border: hex === "#FFFFFF" || hex === "#f6f7f9" ? "1px solid #e3e4e7" : "none",
        transition: "transform 0.1s",
      }} />
      <div style={{ fontFamily: tokens.fonts.body, fontSize: "10px", color: tokens.colors.gray600, lineHeight: 1.3 }}>
        <div style={{ fontWeight: 600, color: tokens.colors.headingColor }}>{copied ? "Copied!" : name}</div>
        <div>{hex}</div>
      </div>
    </div>
  );
}

// ─── SECTION ─────────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{
        fontFamily: tokens.fonts.heading,
        fontSize: "16px",
        fontWeight: 700,
        color: tokens.colors.headingColor,
        marginBottom: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        borderBottom: `2px solid ${tokens.colors.gray100}`,
        paddingBottom: "6px",
      }}>{title}</h2>
      {children}
    </div>
  );
}

// ─── SVG ICON ────────────────────────────────────────────────────────────────

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.5 }) {
  const paths = {
    close: "M18 6L6 18M6 6l12 12",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4m0 4h.01",
    check: "M20 6L9 17l-5-5",
    alert: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    dashboard: "M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm10-3a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z",
    inbox: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 8h4l2 3h4l2-3h4",
    tasks: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
    calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
    bookings: "M2 7h20M2 12h20M2 17h10M16 17l2 2 4-4",
    guests: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 4a4 4 0 10.001-8.001A4 4 0 0017 15z",
    rentals: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    rates: "M2 9a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9zm18-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2",
    discounts: "M9 14l6-6M9.5 9a.5.5 0 100-1 .5.5 0 000 1zm5 5a.5.5 0 100-1 .5.5 0 000 1zM21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    inquiries: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
    reviews: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    performance: "M18 20V10M12 20V4M6 20v-6",
    finance: "M12 2a10 10 0 100 20A10 10 0 0012 2zm1 6H9m4 4H9m2 4H9",
    apps: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    whats_new: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    help: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-14a2 2 0 012 2c0 1.5-2 2-2 3m0 4h.01",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    chevron_down: "M6 9l6 6 6-6",
    chevron_right: "M9 18l6-6-6-6",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    language: "M12 22a10 10 0 100-20 10 10 0 000 20zm0 0c-2.5 0-4-4.5-4-10S9.5 2 12 2s4 4.5 4 10-1.5 10-4 10zM2 12h20",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={paths[name] || ""} />
    </svg>
  );
}

// ─── DIALOG COMPONENTS ───────────────────────────────────────────────────────

function DialogModal({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(53, 64, 82, 0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {children}
    </div>
  );
}

function Dialog({ variant = "default", title, body, onClose, onConfirm, onCancel, confirmLabel = "Confirm", cancelLabel = "Cancel" }) {
  const isDelete = variant === "delete";
  const isSuccess = variant === "success";

  const iconBg = isDelete ? "#fef3f2" : "#effefc";
  const iconColor = isDelete ? tokens.colors.error : tokens.colors.primary;
  const iconName = isDelete ? "trash" : "language";

  return (
    <div style={{
      background: "white",
      borderRadius: tokens.radii.lg,
      boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
      width: 500,
      maxWidth: "calc(100vw - 32px)",
      maxHeight: "90vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 8, right: 8,
          background: "none", border: "none", cursor: "pointer",
          width: 36, height: 36, borderRadius: tokens.radii.md,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: tokens.colors.gray400,
        }}
        onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        <Icon name="close" size={18} />
      </button>

      {/* Body */}
      <div style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, overflow: "auto" }}>
        {isSuccess ? (
          <div style={{
            width: "100%", height: 200,
            borderRadius: tokens.radii.lg, overflow: "hidden",
            background: "linear-gradient(135deg, #effefc 0%, #c9fefa 40%, #ffc6f9 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 64 }}>🎉</span>
          </div>
        ) : (
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: iconBg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon name={iconName} size={26} color={iconColor} />
          </div>
        )}

        {/* Divider */}
        {!isSuccess && <div style={{ width: "100%", height: 1, background: tokens.colors.gray100 }} />}

        <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: tokens.fonts.heading, fontSize: 16, fontWeight: 600, color: tokens.colors.gray600 }}>
            {title}
          </div>
          <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray500, lineHeight: 1.6 }}>
            {body}
          </div>
        </div>

        {/* Content slot (default dialog) */}
        {!isDelete && !isSuccess && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {["Review language mismatch", "Booking.com may reject non-matching replies", "You can re-submit after"].map((item, i) => (
              <div key={i} style={{
                padding: "10px 14px", background: tokens.colors.gray50,
                borderRadius: tokens.radii.sm, border: `1px solid ${tokens.colors.gray100}`,
                fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray600,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Icon name="info" size={15} color={tokens.colors.info} />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${tokens.colors.gray100}`,
        padding: "14px 24px 18px",
        display: "flex",
        gap: 12,
        marginTop: 16,
      }}>
        {!isSuccess && (
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "11px 16px", borderRadius: tokens.radii.md,
              border: `1px solid ${tokens.colors.gray300}`, background: "white", cursor: "pointer",
              fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: tokens.colors.gray500,
            }}
          >{cancelLabel}</button>
        )}
        <button
          onClick={isSuccess ? onClose : onConfirm}
          style={{
            flex: 1, padding: "11px 16px", borderRadius: tokens.radii.md,
            border: "none", cursor: "pointer",
            fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: "white",
            background: isDelete ? tokens.colors.error : "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
          }}
        >{isSuccess ? "Close" : confirmLabel}</button>
      </div>
    </div>
  );
}

// ─── NAVIGATION DRAWER ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "inbox", label: "Inbox", icon: "inbox" },
  { id: "tasks", label: "Tasks", icon: "tasks" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "bookings", label: "Bookings", icon: "bookings" },
  { id: "guests", label: "Guests", icon: "guests" },
  { id: "rentals", label: "Rentals", icon: "rentals" },
  { id: "rates", label: "Rate tables", icon: "rates" },
  { id: "discounts", label: "Discounts", icon: "discounts" },
  { id: "inquiries", label: "Inquiries", icon: "inquiries" },
  { id: "reviews", label: "Reviews", icon: "reviews", hasChildren: true },
  { id: "performance", label: "Performance", icon: "performance" },
  { id: "finance", label: "Finance", icon: "finance" },
  { id: "apps", label: "Apps", icon: "apps" },
  { id: "whats_new", label: "What's new?", icon: "whats_new" },
  { id: "help", label: "Help", icon: "help" },
  { id: "settings", label: "Settings", icon: "settings", hasChildren: true },
];

function NavDrawer({ activeItem = "inbox" }) {
  const [active, setActive] = useState(activeItem);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div style={{
      width: 256, height: 600,
      background: "white",
      borderRadius: tokens.radii.lg,
      border: `1px solid ${tokens.colors.gray100}`,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      boxShadow: "2px 4px 20px rgba(0,0,0,0.06)",
    }}>
      {/* Top: logo + account selector */}
      <div style={{ padding: "14px 12px 8px", borderBottom: `1px solid ${tokens.colors.gray100}` }}>
        <div
          onClick={() => setAccountOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 8px", borderRadius: tokens.radii.md, cursor: "pointer",
            background: accountOpen ? tokens.colors.gray50 : "transparent",
            userSelect: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
          onMouseLeave={e => e.currentTarget.style.background = accountOpen ? tokens.colors.gray50 : "transparent"}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: 13, fontFamily: tokens.fonts.heading }}>S</span>
          </div>
          <span style={{ fontFamily: tokens.fonts.heading, fontWeight: 700, fontSize: 13, color: tokens.colors.headingColor, flex: 1 }}>
            Conciergerie
          </span>
          <Icon name="chevron_down" size={16} color={tokens.colors.gray400} />
        </div>

        {accountOpen && (
          <div style={{ marginTop: 4, padding: "4px 0" }}>
            <div style={{ padding: "4px 8px", marginBottom: 4 }}>
              <input
                placeholder="Search accounts..."
                style={{
                  width: "100%", padding: "5px 8px", borderRadius: tokens.radii.sm,
                  border: `1px solid ${tokens.colors.gray200}`, fontFamily: tokens.fonts.body,
                  fontSize: 12, color: tokens.colors.gray700, background: tokens.colors.gray50,
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            {["Benakey", "Demo Account", "Gwern", "Locastay", "Megan Account"].map(acc => (
              <div key={acc} style={{
                padding: "7px 12px", fontFamily: tokens.fonts.body, fontSize: 13,
                color: tokens.colors.gray700, cursor: "pointer", borderRadius: tokens.radii.sm,
              }}
                onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{acc}</div>
            ))}
          </div>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: tokens.radii.md, cursor: "pointer",
                marginBottom: 1,
                background: isActive ? "rgba(29, 200, 202, 0.1)" : "transparent",
                color: isActive ? tokens.colors.primary : tokens.colors.gray600,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = tokens.colors.gray50; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={item.icon} size={17} color={isActive ? tokens.colors.primary : tokens.colors.gray400} />
              <span style={{
                fontFamily: tokens.fonts.body, fontSize: 13,
                fontWeight: isActive ? 600 : 400, flex: 1,
                color: isActive ? tokens.colors.primary : tokens.colors.gray700,
              }}>{item.label}</span>
              {item.hasChildren && <Icon name="chevron_right" size={14} color={tokens.colors.gray300} />}
            </div>
          );
        })}
      </div>

      {/* Bottom: user */}
      <div style={{
        borderTop: `1px solid ${tokens.colors.gray100}`,
        padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: tokens.colors.gray200,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon name="user" size={15} color={tokens.colors.gray500} />
        </div>
        <span style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray700, fontWeight: 500 }}>
          User name
        </span>
      </div>
    </div>
  );
}

// ─── INFORMATIONAL CARDS ─────────────────────────────────────────────────────

const CARD_PURPOSES = {
  informational: {
    bg: "#f1f9fe", border: "#99c2f5", text: "#114869",
    icon: "info", label: "Informational",
  },
  neutral: {
    bg: tokens.colors.gray50, border: tokens.colors.gray300, text: tokens.colors.gray900,
    icon: "info", label: "Neutral",
  },
  success: {
    bg: "#f2fbf4", border: "#96dfa6", text: "#1d4a29",
    icon: "check", label: "Success",
  },
  warning: {
    bg: "#fffbeb", border: "#f8d451", text: "#763811",
    icon: "alert", label: "Warning",
  },
  smily: {
    bg: "#effefc", border: "#55f3f0", text: "#0f4e52",
    icon: "alert", label: "Smily branded",
  },
  danger: {
    bg: "#fef3f2", border: "#f9b0a8", text: "#7b2921",
    icon: "alert", label: "Danger",
  },
};

function InfoCard({ purpose = "informational", header = "Header", body = "This booking contains locked fields.", onAction }) {
  const cfg = CARD_PURPOSES[purpose];
  return (
    <div style={{
      background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 12,
      padding: "20px", display: "flex", flexDirection: "column", gap: 12,
      width: 280,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name={cfg.icon} size={18} color={cfg.text} />
        <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 600, color: cfg.text }}>{header}</span>
      </div>
      <p style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: cfg.text, margin: 0, lineHeight: 1.55 }}>{body}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onAction}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: "4px 0",
            fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 600, color: cfg.text,
            textDecoration: "underline",
          }}
        >See why</button>
      </div>
    </div>
  );
}

function MetricCard({ purpose = "neutral", label = "Body", metric = "Heading 1", sublabel = "Body" }) {
  const cfg = CARD_PURPOSES[purpose];
  const metricColor = purpose === "smily" ? "#04969d" : purpose === "danger" ? "#d53d2d" : tokens.colors.gray700;
  return (
    <div style={{
      background: cfg.bg, borderRadius: 12, padding: "24px 20px",
      display: "flex", flexDirection: "column", gap: 10, width: 200,
    }}>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{label}</span>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 24, fontWeight: 600, color: metricColor }}>{metric}</span>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{sublabel}</span>
    </div>
  );
}

function DiscoveryCard({ onClose }) {
  return (
    <div style={{
      background: "white", borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
      overflow: "hidden", display: "flex", flexDirection: "column", width: 420,
    }}>
      <div style={{
        height: 140, background: "linear-gradient(135deg, #effefc 0%, #c9fefa 35%, #ffc6f9 75%, #ff98f3 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <span style={{ fontSize: 48 }}>😊</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%",
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: tokens.colors.gray500,
            }}
          ><Icon name="close" size={13} /></button>
        )}
        <div style={{
          position: "absolute", top: 8, left: 10,
          background: "#fff0fc", border: "1px solid #ff98f3", borderRadius: tokens.radii.sm,
          padding: "1px 8px", fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: 600, color: "#ff01bb",
        }}>NEW</div>
      </div>
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: tokens.fonts.body, fontSize: 17, fontWeight: 600, color: tokens.colors.gray600 }}>
          Keep track of your payouts
        </div>
        <p style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700, margin: 0, lineHeight: 1.6 }}>
          Get paid directly to your own account—no need to wait for the owner's transfer. See exactly what you receive and when.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
          <ButtonSolid>Create a SmilyPay account</ButtonSolid>
          <ButtonText>Learn more</ButtonText>
        </div>
      </div>
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

const TABS = ["Colors", "Typography", "Buttons", "Inputs", "Dialogs", "Navigation", "Cards"];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function SmilyDesignSystem() {
  const [activeTab, setActiveTab] = useState("Colors");
  const [inputVal, setInputVal] = useState("");
  const [inputVal2, setInputVal2] = useState("Hello world");
  const [openDialog, setOpenDialog] = useState(null); // "default" | "delete" | "success" | null

  return (
    <div style={{
      fontFamily: tokens.fonts.body,
      background: tokens.colors.gray50,
      minHeight: "100vh",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap');
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: #828fae; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${tokens.colors.gray100}`,
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "14px", fontFamily: tokens.fonts.heading }}>S</span>
            </div>
            <h1 style={{ fontFamily: tokens.fonts.heading, fontSize: "20px", fontWeight: 800, color: tokens.colors.headingColor, margin: 0 }}>
              Smily Design System
            </h1>
          </div>
          <p style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500, margin: "4px 0 0 42px" }}>
            Component Library — Colors · Typography · Buttons · Inputs
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.colors.primary }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.colors.secondary }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${tokens.colors.gray100}`,
        padding: "0 32px",
        display: "flex",
        gap: "0",
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? `2px solid ${tokens.colors.primary}` : "2px solid transparent",
              padding: "12px 20px",
              fontFamily: tokens.fonts.body,
              fontSize: "14px",
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? tokens.colors.primary : tokens.colors.gray500,
              cursor: "pointer",
              transition: "color 0.15s",
              marginBottom: "-1px",
            }}
          >{tab}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>

        {/* COLORS */}
        {activeTab === "Colors" && (
          <div>
            <Section title="Brand">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ width: 100, height: 56, borderRadius: "8px", background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)" }} />
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "10px", color: tokens.colors.headingColor, fontWeight: 600 }}>Primary Gradient</div>
                </div>
                <Swatch name="Primary" hex="#1DC8CA" large />
                <Swatch name="Secondary" hex="#FF01BB" large />
              </div>
            </Section>

            <Section title="Status">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Swatch name="Success" hex="#3DB559" />
                <Swatch name="Error" hex="#E74C3C" />
                <Swatch name="Warning" hex="#FD8B07" />
                <Swatch name="Info" hex="#199BD9" />
              </div>
            </Section>

            <Section title="Gray Scale">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50", "#f6f7f9"], ["100", "#ecedf2"], ["200", "#d4d8e3"], ["300", "#aeb6cb"],
                  ["400", "#828fae"], ["500", "#627093"], ["600", "#4e5a7b"], ["700", "#404964"],
                  ["800", "#383f54"], ["900", "#323748"], ["950", "#212430"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Gray-${name}`} hex={hex} />
                ))}
              </div>
            </Section>

            <Section title="Teal Palette (Primary)">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50","#effefc"],["100","#c9fefa"],["200","#93fcf6"],["300","#55f3f0"],
                  ["400","#1dc8ca"],["500","#09bdc3"],["600","#04969d"],["700","#08767d"],
                  ["800","#0c5c63"],["900","#0f4e52"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Teal-${name}`} hex={hex} />
                ))}
              </div>
            </Section>

            <Section title="Pink Palette (Secondary)">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50","#fff0fc"],["100","#ffe3fc"],["200","#ffc6f9"],["300","#ff98f3"],
                  ["400","#ff58e7"],["500","#ff27d7"],["600","#ff01bb"],["700","#df0097"],
                  ["800","#b8007d"],["900","#5f003c"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Pink-${name}`} hex={hex} />
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {activeTab === "Typography" && (
          <div>
            <Section title="Typefaces">
              <div style={{ display: "flex", gap: "32px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.heading, fontSize: "28px", fontWeight: 800, color: tokens.colors.headingColor }}>Mulish</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500 }}>Headings · UI labels</div>
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "28px", fontWeight: 400, color: tokens.colors.headingColor }}>Open Sans</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500 }}>Body · Inputs · Captions</div>
                </div>
              </div>
            </Section>

            <Section title="Heading Scale (Mulish)">
              {[
                { label: "heading-xs", size: "14px", weight: 600 },
                { label: "heading-sm", size: "16px", weight: 600 },
                { label: "heading-md", size: "20px", weight: 700 },
                { label: "heading-lg", size: "24px", weight: 700 },
                { label: "heading-xl", size: "30px", weight: 800 },
                { label: "heading-2xl", size: "36px", weight: 800 },
              ].map(({ label, size, weight }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", borderBottom: `1px solid ${tokens.colors.gray100}`, paddingBottom: "8px" }}>
                  <div style={{ width: "120px", fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500 }}>{label}</div>
                  <div style={{ fontFamily: tokens.fonts.heading, fontSize: size, fontWeight: weight, color: tokens.colors.headingColor, lineHeight: 1.25 }}>The quick brown fox</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray400, marginLeft: "auto" }}>{size} / {weight}</div>
                </div>
              ))}
            </Section>

            <Section title="Body Scale (Open Sans)">
              {[
                { label: "text-2xs", size: "10px" },
                { label: "text-xs", size: "12px" },
                { label: "text-sm", size: "14px" },
                { label: "text-md", size: "16px" },
                { label: "text-lg", size: "18px" },
                { label: "text-xl", size: "20px" },
              ].map(({ label, size }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", borderBottom: `1px solid ${tokens.colors.gray100}`, paddingBottom: "8px" }}>
                  <div style={{ width: "120px", fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500 }}>{label}</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: size, fontWeight: 400, color: tokens.colors.dark, lineHeight: 1.5 }}>The quick brown fox jumps over the lazy dog</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray400, marginLeft: "auto" }}>{size}</div>
                </div>
              ))}
            </Section>
          </div>
        )}

        {/* BUTTONS */}
        {activeTab === "Buttons" && (
          <div>
            <Section title="Solid (Primary)">
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Size M</div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <ButtonSolid>Button</ButtonSolid>
                    <ButtonSolid disabled>Disabled</ButtonSolid>
                    <ButtonSolid loading>Loading</ButtonSolid>
                    <ButtonSolid leadingIcon={<span>←</span>}>With Icon</ButtonSolid>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Size S</div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <ButtonSolid size="S">Button</ButtonSolid>
                    <ButtonSolid size="S" disabled>Disabled</ButtonSolid>
                    <ButtonSolid size="S" loading>Loading</ButtonSolid>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Outline (Tertiary)">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <ButtonOutline>Button</ButtonOutline>
                  <ButtonOutline disabled>Disabled</ButtonOutline>
                  <ButtonOutline size="S">Small</ButtonOutline>
                </div>
              </div>
            </Section>

            <Section title="Tonal">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <ButtonTonal>Button</ButtonTonal>
                <ButtonTonal disabled>Disabled</ButtonTonal>
                <ButtonTonal size="S">Small</ButtonTonal>
              </div>
            </Section>

            <Section title="Text">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <ButtonText>Text Button</ButtonText>
                <ButtonText disabled>Disabled</ButtonText>
                <ButtonText size="S">Small</ButtonText>
              </div>
            </Section>

            <Section title="All Variants Side-by-Side">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", padding: "20px", background: "white", borderRadius: "8px", border: `1px solid ${tokens.colors.gray100}` }}>
                <ButtonSolid>Solid</ButtonSolid>
                <ButtonTonal>Tonal</ButtonTonal>
                <ButtonOutline>Outline</ButtonOutline>
                <ButtonText>Text</ButtonText>
              </div>
            </Section>
          </div>
        )}

        {/* INPUTS */}
        {activeTab === "Inputs" && (
          <div>
            <Section title="Input States">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Default (placeholder)</div>
                  <InputField label="Property name" placeholder="Enter value" helperText="Helper text" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Focused (click to try)</div>
                  <InputField label="Guest name" placeholder="Enter guest name" helperText="Type to search" value={inputVal} onChange={e => setInputVal(e.target.value)} maxLength={30} />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Entered / Filled</div>
                  <InputField label="Property name" placeholder="Enter value" value={inputVal2} onChange={e => setInputVal2(e.target.value)} maxLength={20} />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Error state</div>
                  <InputField label="Email" placeholder="email@example.com" state="error" helperText="Please enter a valid email" value="not-valid" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Disabled</div>
                  <InputField label="Property ID" placeholder="Auto-generated" state="disabled" helperText="This field is read-only" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>No label / Minimal</div>
                  <InputField placeholder="Search properties..." />
                </div>
              </div>
            </Section>

            <Section title="Token Reference">
              <table style={{ width: "100%", fontFamily: tokens.fonts.body, fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tokens.colors.gray100}` }}>
                    {["State", "Border", "Background", "Text"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: tokens.colors.gray500, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Default", "gray-400 #828fae", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Focused", "primary #1DC8CA (1.5px)", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Error", "red-500 #E74C3C (1.5px)", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Disabled", "gray-200 #d4d8e3", "gray-100 #ecedf2", "gray-400 #828fae"],
                  ].map(([state, border, bg, text]) => (
                    <tr key={state} style={{ borderBottom: `1px solid ${tokens.colors.gray50}` }}>
                      {[state, border, bg, text].map((cell, i) => (
                        <td key={i} style={{ padding: "6px 8px", color: tokens.colors.dark }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>
        )}

        {/* DIALOGS */}
        {activeTab === "Dialogs" && (
          <div>
            {openDialog && (
              <DialogModal onClose={() => setOpenDialog(null)}>
                <Dialog
                  variant={openDialog}
                  title={
                    openDialog === "delete" ? "Confirm Deletion"
                    : openDialog === "success" ? "Smile, you are all set!"
                    : "Language Mismatch Detected"
                  }
                  body={
                    openDialog === "delete"
                      ? "Are you sure you want to delete this item? This action cannot be undone."
                    : openDialog === "success"
                      ? "We are preparing your rental on Booking.com. It should be available in 24 hours."
                    : "We noticed that your reply is in another language than that of the client review. Some platforms like Booking.com may reject your reply."
                  }
                  confirmLabel={openDialog === "delete" ? "Delete" : "Publish anyway"}
                  cancelLabel="Cancel"
                  onClose={() => setOpenDialog(null)}
                  onConfirm={() => setOpenDialog(null)}
                  onCancel={() => setOpenDialog(null)}
                />
              </DialogModal>
            )}

            <Section title="Dialog Variants">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                {[
                  { variant: "default", label: "Default Dialog", desc: "Icon + content + Cancel / Confirm" },
                  { variant: "delete", label: "Delete Dialog", desc: "Destructive action confirmation" },
                  { variant: "success", label: "Success Dialog", desc: "Celebration state with illustration" },
                ].map(({ variant, label, desc }) => (
                  <div key={variant} style={{
                    border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.lg,
                    padding: "20px 24px", background: "white", display: "flex", flexDirection: "column", gap: 10, minWidth: 220,
                  }}>
                    <div style={{ fontFamily: tokens.fonts.heading, fontSize: 14, fontWeight: 700, color: tokens.colors.headingColor }}>{label}</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray500 }}>{desc}</div>
                    <ButtonSolid onClick={() => setOpenDialog(variant)} size="S">Open dialog</ButtonSolid>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Anatomy">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{
                  background: "white", borderRadius: tokens.radii.lg, boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
                  width: 420, padding: "24px", display: "flex", flexDirection: "column", gap: 14,
                }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: 32, height: 32, borderRadius: tokens.radii.md, background: tokens.colors.gray50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="close" size={16} color={tokens.colors.gray400} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#effefc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="language" size={24} color={tokens.colors.primary} />
                    </div>
                  </div>
                  <div style={{ height: 1, background: tokens.colors.gray100 }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: tokens.fonts.heading, fontSize: 16, fontWeight: 600, color: tokens.colors.gray600, marginBottom: 6 }}>Dialog Title</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray500, lineHeight: 1.6 }}>Supporting description text goes here. Keep it short and clear.</div>
                  </div>
                  <div style={{ height: 1, background: tokens.colors.gray100 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <ButtonOutline style={{ flex: 1 }}>Cancel</ButtonOutline>
                    <ButtonSolid style={{ flex: 1 }}>Confirm</ButtonSolid>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
                  {[
                    ["Width", "500px"],
                    ["Border radius", "8px (lg)"],
                    ["Shadow", "2px 4px 20px rgba(0,0,0,0.10)"],
                    ["Header", "Open Sans SemiBold 16px"],
                    ["Body", "Open Sans Regular 14px"],
                    ["Footer buttons", "Full-width, flex row"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 120, fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{k}</div>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.dark }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* NAVIGATION DRAWER */}
        {activeTab === "Navigation" && (
          <div>
            <Section title="Navigation Drawer">
              <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
                <NavDrawer />
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7 }}>
                    Navigation drawers let users switch between main views on larger screens. Click any item to set active state. Click the account name to open the account switcher.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      ["Width", "256px"],
                      ["Item height", "~36px"],
                      ["Active bg", "rgba(29,200,202, 0.10)"],
                      ["Active text", "Primary #1DC8CA"],
                      ["Inactive text", "Gray-700 #404964"],
                      ["Icon size", "17px"],
                      ["Font", "Open Sans 13px"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: 12 }}>
                        <div style={{ width: 110, fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{k}</div>
                        <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.dark }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Item States">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Default", bg: "transparent", color: tokens.colors.gray700, iconColor: tokens.colors.gray400, weight: 400 },
                  { label: "Hover", bg: tokens.colors.gray50, color: tokens.colors.gray700, iconColor: tokens.colors.gray400, weight: 400 },
                  { label: "Active", bg: "rgba(29,200,202,0.10)", color: tokens.colors.primary, iconColor: tokens.colors.primary, weight: 600 },
                ].map(({ label, bg, color, iconColor, weight }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray500 }}>{label}</div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px", borderRadius: tokens.radii.md, background: bg, width: 180,
                    }}>
                      <Icon name="inbox" size={17} color={iconColor} />
                      <span style={{ fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: weight, color }}> Inbox</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* CARDS */}
        {activeTab === "Cards" && (
          <div>
            <Section title="Informational Cards (Text)">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {Object.entries(CARD_PURPOSES).map(([key, cfg]) => (
                  <InfoCard key={key} purpose={key} header={cfg.label} />
                ))}
              </div>
            </Section>

            <Section title="Metric Cards">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MetricCard purpose="neutral" label="Total bookings" metric="1,284" sublabel="This month" />
                <MetricCard purpose="smily" label="Revenue" metric="€42,600" sublabel="+12% vs last month" />
                <MetricCard purpose="danger" label="Cancellations" metric="38" sublabel="This month" />
              </div>
            </Section>

            <Section title="Discovery Card">
              <DiscoveryCard />
            </Section>

            <Section title="Token Reference">
              <table style={{ width: "100%", fontFamily: tokens.fonts.body, fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tokens.colors.gray100}` }}>
                    {["Variant", "Background", "Border", "Text color"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: tokens.colors.gray500, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Informational", "#f1f9fe", "#99c2f5", "#114869"],
                    ["Neutral", "#f6f7f9 (gray-50)", "#aeb6cb (gray-300)", "#404964 (gray-700)"],
                    ["Success", "#f2fbf4", "#96dfa6", "#1d4a29"],
                    ["Warning", "#fffbeb", "#f8d451", "#763811"],
                    ["Smily branded", "#effefc (teal-50)", "#55f3f0 (teal-300)", "#0f4e52 (teal-900)"],
                    ["Danger", "#fef3f2 (red-50)", "#f9b0a8 (red-300)", "#7b2921 (red-900)"],
                  ].map(([variant, bg, border, text]) => (
                    <tr key={variant} style={{ borderBottom: `1px solid ${tokens.colors.gray50}` }}>
                      {[variant, bg, border, text].map((cell, i) => (
                        <td key={i} style={{ padding: "6px 8px", color: tokens.colors.dark }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
