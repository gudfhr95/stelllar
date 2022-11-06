import { getOS } from "@/utils/getOS";
import { version } from "../../package.json";

export const getDownloadLink = () => {
  const os = getOS()
  if (os === 'Windows')
    return `https://github.com/gudfhr95/stelllar/releases/download/${version}/Stelllar-Setup-${version}.exe`
  else if (os === 'Mac OS')
    return `https://github.com/gudfhr95/stelllar/releases/download/${version}/Stelllar-${version}.dmg`
  else if (os === 'Linux')
    return `https://github.com/gudfhr95/stelllar/releases/download/${version}/Stelllar-${version}.AppImage`
}
