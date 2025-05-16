export async function checkCameraPermission() {
  try {
    const result = await navigator.permissions.query({
      name: "camera" as PermissionName,
    });

    if (result.state === "granted") {
      console.log("Camera permission granted");
    } else if (result.state === "prompt") {
      console.log("Camera permission needs to be requested");
    } else if (result.state === "denied") {
      alert(
        "Camera access is blocked. Please enable it in your browser settings."
      );
    }
  } catch (err) {
    console.error("Permission check failed:", err);
  }
}
