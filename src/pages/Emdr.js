import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  Typography,
  Container,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Pause,
  PlayArrow,
  ExpandMore,
  ExpandLess,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";

const Emdr = () => {
  // Get initial values from URL or local storage
  const getInitialValue = (paramName, defaultValue) => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlValue = urlParams.get(paramName);

    if (urlValue) {
      return parseFloat(urlValue);
    }

    const storedValue = localStorage.getItem(paramName);

    return storedValue ? parseFloat(storedValue) : defaultValue;
  };

  const [speed, setSpeed] = useState(getInitialValue("speed", 2));
  const [size, setSize] = useState(getInitialValue("size", 100));
  const [isPaused, setIsPaused] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Update URL and local storage when values change
  const updateValue = (setter, paramName) => (e, newValue) => {
    setter(newValue);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(paramName, newValue);
    window.history.replaceState({}, "", `?${urlParams.toString()}`);
    localStorage.setItem(paramName, newValue);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleControls = () => {
    setIsControlsOpen(!isControlsOpen);
  };

  const handleMainClick = (e) => {
    // Prevent toggling pause if clicking on the expand/collapse button or within the control panel
    if (
      e.target.closest('[aria-label="toggle controls"]') ||
      e.target.closest('[role="presentation"]')
    ) {
      return;
    }

    // Toggle pause
    setIsPaused((prev) => !prev);
  };

  // Full screen functionality
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullScreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      setIsFullScreen(!!isCurrentlyFullScreen);

      // Close controls when entering full screen
      if (isCurrentlyFullScreen) {
        setIsControlsOpen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <Box
      onClick={handleMainClick}
      sx={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Full Screen Toggle */}
      <IconButton
        onClick={toggleFullScreen}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
      </IconButton>

      {/* Tracking Ball */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: size,
          height: size,
          backgroundColor: "white",
          borderRadius: "50%",
          animation: isPaused
            ? "none"
            : `moveHorizontal ${6 - speed}s linear infinite`,
        }}
      />

      {/* Controls Container */}
      <Container
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Only show expand/collapse toggle when not in full screen */}
        {!isFullScreen && (
          <IconButton
            aria-label="toggle controls"
            onClick={toggleControls}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            {isControlsOpen ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        )}

        {/* Collapsible Control Panel */}
        <Collapse in={isControlsOpen && !isFullScreen} unmountOnExit>
          <Container
            role="presentation"
            sx={{
              color: "white",
              padding: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Stack spacing={2} direction="column" width={200}>
              {/* Pause/Play Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={togglePause}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  {isPaused ? <PlayArrow /> : <Pause />}
                </IconButton>
              </Box>

              {/* Speed Slider */}
              <Box>
                <Typography id="speed-slider" gutterBottom>
                  Speed:
                </Typography>
                <Slider
                  value={speed}
                  onChange={updateValue(setSpeed, "speed")}
                  step={0.1}
                  min={0.5}
                  max={5}
                />
              </Box>

              {/* Size Slider */}
              <Box>
                <Typography id="size-slider" gutterBottom>
                  Size:
                </Typography>
                <Slider
                  value={size}
                  onChange={updateValue(setSize, "size")}
                  step={10}
                  min={20}
                  max={200}
                />
              </Box>
            </Stack>
          </Container>
        </Collapse>
      </Container>

      <style>
        {`
          @keyframes moveHorizontal {
            0%, 100% {
              left: 0;
            }
            50% {
              left: calc(100vw - ${size}px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Emdr;
