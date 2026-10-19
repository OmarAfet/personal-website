// Text art in the VGA font's block and box-drawing characters.

// "OMAR" and "AFET" in the ANSI Shadow figlet style. Two words, so they can sit
// on one line on a wide screen and stack on a phone.
export const banner = {
  omar: [
    " ██████╗ ███╗   ███╗ █████╗ ██████╗ ",
    "██╔═══██╗████╗ ████║██╔══██╗██╔══██╗",
    "██║   ██║██╔████╔██║███████║██████╔╝",
    "██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗",
    "╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║",
    " ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝",
  ],
  afet: [
    " █████╗ ███████╗███████╗████████╗",
    "██╔══██╗██╔════╝██╔════╝╚══██╔══╝",
    "███████║█████╗  █████╗     ██║   ",
    "██╔══██║██╔══╝  ██╔══╝     ██║   ",
    "██║  ██║██║     ███████╗   ██║   ",
    "╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝   ",
  ],
};

// The KSA emblem (the site favicon) in half blocks, 34 columns. Made with:
//   python3 -I scripts/emblem-art.py ~/Personal/People/Omar/Brand-Media/Logos/WHITE_KSA_LOGO.PNG 34 140
export const emblem = [
  "          ▄▄ ██████▄▄",
  "         ▄▄██████████▄▄",
  "          ▀█████████████",
  "       ▄███████████████▄▄",
  "        ▄████████████▀▀█",
  "          ▀█████████▀█",
  "             ▀▀███▄▀▀",
  "                ██",
  "                ██",
  "                ██",
  "                ██",
  "▄▄▄▄▄▄▄         ██         ▄▄▄▄▄▄▄",
  "    ▀▀▀██▄▄  ████████▀ ▄▄██▀▀▀",
  "         ▀██▄▄      ▄▄██▀",
  "            ▀██▄  ▄██▀",
  "              ▀████▀",
  "           ▄▄ ▄█▀▀██ ▄▄",
  "       ▄▄▄▄▄███    ███▄▄▄▄▄",
  "       ▀████▀▀▀    ▀▀▀████▀",
];
