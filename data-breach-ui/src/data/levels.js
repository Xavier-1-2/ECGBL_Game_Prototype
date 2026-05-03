export const levels = [
  {
    id: 1,
    title: "OPERATION: COLD BOOT",
    taskType: "HARDWARE_IDENTIFY",
    intel: [
      "Agent, you're in the server room. We need to wipe the local cache.",
      "Locate the RAM modules. Remember, RAM is 'Volatile'—cut the power and the data is gone.",
      "Select the correct component to proceed."
    ],
    objective: "Identify the RAM module",
    answer: "RAM"
  },
  {
  id: 2,
  title: "OPERATION: DEEP_DIVE",
  taskType: "TERMINAL_SEQUENCE",
  intel: [
    "LOG_01: Hardware bypass successful. Connection to the main terminal is stable.",
    "LOG_02: Use 'ls' to see where you are, then 'cd' to move deeper.",
    "----------------------------------------------------------",
    "OBJECTIVE A: List the directories to find the hidden 'root_admin' folder.",
    "OBJECTIVE B: Enter the restricted 'root_admin' folder zone.",
    "OBJECTIVE C: List the folder contents again to find the 'logs' folder.",
    "OBJECTIVE D: Finalize the infiltration. Advance into the 'logs' folder.",
  ],
  objective: "Access the encrypted data logs",
 
  steps: [
    { cmd: "ls", response: "bin/  etc/  home/  root_admin/  usr/" },
    { cmd: "cd root_admin", response: "ACCESS_GRANTED. Directory changed to /root_admin" },
    { cmd: "ls", response: "logs/  security/  vault_key.txt" },
    { cmd: "cd logs", response: "Entering /root_admin/logs..." }
  ]
},
{
  id: 3,
  title: "OPERATION: GATEKEEPER",
  taskType: "FIREWALL_FILTER",
  intel: [
    "LOG_03: We've intercepted the firewall's manual override.",
    "LOG_04: Our field agents are spoofing internal IPs: 192.168.X.X",
    "LOG_05: Block All other IPs.",
    "GOAL: Successfully filter 5 packets to bridge the connection."
  ],
  objective: "Filter 5 Agent Packets",
  targetScore: 5
},
{
  id: 4,
  title: "OPERATION: LOGIC_GATE",
  taskType: "BOOLEAN_GATE",
  intel: [
    "LOG_09: The backup power bypass uses logical gates.",
    "LOG_010: Turn on th power.",
  ],
  objective: "Bypass the Power Gate",
},
{
  id: 5,
  title: "OPERATION: DATA_LEAK",
  taskType: "TERMINAL_SEQUENCE",
  intel: [
    "LOG_11: You've reached the main database terminal.",
    "LOG_12: We need to query the 'users' table for the 'admin' password.",
    "----------------------------------------------------------",
    "[STEP_A]: List all the database tables.",
    "[STEP_B]: See all entries in the 'users' table.",
    "[STEP_C]: Select the password for admins"
    //"[STEP_C]: Type 'SELECT password FROM users WHERE name = admin' to extract the key."
  ],
  objective: "Extract the Admin Password",
  steps: [
    { cmd: "ls", response: "TABLES: orders, inventory, users, logs" },
    { cmd: "select * from users", response: "ID: 1 | NAME: guest | PASSWORD: [encrypted] | ID: 2 | NAME: admin | PASSWORD: [encrypted]" },
    { cmd: "select password from users where name = 'admin'", response: "DECRYPTING... KEY: 8892-X" }
  ]
}
];