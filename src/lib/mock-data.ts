export type UserRole = "admin" | "doctor" | "assistant";
export type AppointmentStatus =
  | "programada"
  | "confirmada"
  | "completada"
  | "cancelada"
  | "no_asistio";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  joinedAt: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  notes: string;
  emergencyContact: string;
  lastVisit: string | null;
  nextAppointment: string | null;
  totalVisits: number;
  firstVisit: string | null;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  status: AppointmentStatus;
  notes: string;
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescriptions: string;
  doctorName: string;
  service: string;
  nextVisit: string | null;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Dra. Brenda Cervantes",
    email: "brenda@excellence.com",
    role: "admin",
    active: true,
    joinedAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Dra. Sarah Kim",
    email: "sarah@excellence.com",
    role: "doctor",
    active: true,
    joinedAt: "2025-01-20",
  },
  {
    id: "3",
    name: "Dr. Ramón Torres",
    email: "ramon@excellence.com",
    role: "doctor",
    active: true,
    joinedAt: "2025-03-10",
  },
  {
    id: "4",
    name: "Luis Aguilar",
    email: "luis@excellence.com",
    role: "assistant",
    active: true,
    joinedAt: "2025-06-01",
  },
  {
    id: "5",
    name: "Ana Morales",
    email: "ana@excellence.com",
    role: "assistant",
    active: false,
    joinedAt: "2025-04-15",
  },
];

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "María Rodríguez",
    age: 34,
    birthDate: "1991-03-15",
    phone: "+52 55 1234 5678",
    email: "maria@correo.com",
    gender: "Femenino",
    address: "Av. Reforma 123, Col. Juárez, CDMX",
    notes: "Alergia a penicilina",
    emergencyContact: "Carlos Rodríguez - +52 55 8765 4321",
    lastVisit: "2026-02-12",
    nextAppointment: "2026-03-03",
    totalVisits: 8,
    firstVisit: "2024-06-20",
  },
  {
    id: "2",
    name: "Jorge Castellanos",
    age: 51,
    birthDate: "1974-08-22",
    phone: "+52 55 8478 9012",
    email: "jorge@correo.com",
    gender: "Masculino",
    address: "Calle Durango 456, Col. Roma, CDMX",
    notes: "Hipertensión controlada",
    emergencyContact: "Laura Castellanos - +52 55 3456 7890",
    lastVisit: "2026-01-28",
    nextAppointment: null,
    totalVisits: 3,
    firstVisit: "2025-09-10",
  },
  {
    id: "3",
    name: "Ana Lucía Pérez",
    age: 28,
    birthDate: "1997-11-05",
    phone: "+52 55 6789 0123",
    email: "analucia@correo.com",
    gender: "Femenino",
    address: "Av. Insurgentes Sur 789, CDMX",
    notes: "",
    emergencyContact: "Roberto Pérez - +52 55 1122 3344",
    lastVisit: "2026-02-25",
    nextAppointment: "2026-02-27",
    totalVisits: 12,
    firstVisit: "2024-01-15",
  },
  {
    id: "4",
    name: "Roberto Sánchez",
    age: 45,
    birthDate: "1980-06-30",
    phone: "+52 55 2345 6789",
    email: "roberto@correo.com",
    gender: "Masculino",
    address: "Calle Sonora 234, Col. Condesa, CDMX",
    notes: "Diabetes tipo 2",
    emergencyContact: "María Sánchez - +52 55 5566 7788",
    lastVisit: "2025-08-14",
    nextAppointment: null,
    totalVisits: 5,
    firstVisit: "2024-11-20",
  },
  {
    id: "5",
    name: "Carmen Delgado",
    age: 62,
    birthDate: "1963-12-18",
    phone: "+52 55 3456 7890",
    email: "carmen@correo.com",
    gender: "Femenino",
    address: "Paseo de la Reforma 567, CDMX",
    notes: "Prótesis dental parcial superior",
    emergencyContact: "Elena Delgado - +52 55 9988 7766",
    lastVisit: "2026-02-20",
    nextAppointment: "2026-03-15",
    totalVisits: 15,
    firstVisit: "2023-05-10",
  },
  {
    id: "6",
    name: "Fernando Gutiérrez",
    age: 38,
    birthDate: "1987-09-08",
    phone: "+52 55 4567 8901",
    email: "fernando@correo.com",
    gender: "Masculino",
    address: "Av. Chapultepec 890, CDMX",
    notes: "",
    emergencyContact: "Patricia Gutiérrez - +52 55 4455 6677",
    lastVisit: "2026-02-26",
    nextAppointment: "2026-02-27",
    totalVisits: 6,
    firstVisit: "2025-03-22",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "3",
    patientName: "Ana Lucía Pérez",
    doctorId: "2",
    doctorName: "Dra. Sarah Kim",
    date: "2026-02-27",
    time: "09:00",
    duration: 30,
    service: "Limpieza",
    status: "confirmada",
    notes: "",
  },
  {
    id: "2",
    patientId: "6",
    patientName: "Fernando Gutiérrez",
    doctorId: "2",
    doctorName: "Dra. Sarah Kim",
    date: "2026-02-27",
    time: "10:00",
    duration: 45,
    service: "Obturación",
    status: "programada",
    notes: "Diente #18",
  },
  {
    id: "3",
    patientId: "1",
    patientName: "María Rodríguez",
    doctorId: "3",
    doctorName: "Dr. Ramón Torres",
    date: "2026-02-27",
    time: "10:30",
    duration: 60,
    service: "Endodoncia",
    status: "confirmada",
    notes: "",
  },
  {
    id: "4",
    patientId: "5",
    patientName: "Carmen Delgado",
    doctorId: "2",
    doctorName: "Dra. Sarah Kim",
    date: "2026-02-27",
    time: "11:30",
    duration: 30,
    service: "Consulta",
    status: "programada",
    notes: "Revisión de prótesis",
  },
  {
    id: "5",
    patientId: "2",
    patientName: "Jorge Castellanos",
    doctorId: "3",
    doctorName: "Dr. Ramón Torres",
    date: "2026-02-27",
    time: "14:00",
    duration: 45,
    service: "Blanqueamiento",
    status: "programada",
    notes: "",
  },
  {
    id: "6",
    patientId: "3",
    patientName: "Ana Lucía Pérez",
    doctorId: "2",
    doctorName: "Dra. Sarah Kim",
    date: "2026-02-26",
    time: "10:00",
    duration: 30,
    service: "Limpieza",
    status: "completada",
    notes: "",
  },
  {
    id: "7",
    patientId: "1",
    patientName: "María Rodríguez",
    doctorId: "2",
    doctorName: "Dra. Sarah Kim",
    date: "2026-02-25",
    time: "09:30",
    duration: 45,
    service: "Obturación",
    status: "completada",
    notes: "",
  },
  {
    id: "8",
    patientId: "4",
    patientName: "Roberto Sánchez",
    doctorId: "3",
    doctorName: "Dr. Ramón Torres",
    date: "2026-02-24",
    time: "11:00",
    duration: 30,
    service: "Consulta",
    status: "no_asistio",
    notes: "",
  },
  {
    id: "9",
    patientId: "5",
    patientName: "Carmen Delgado",
    doctorId: "3",
    doctorName: "Dr. Ramón Torres",
    date: "2026-03-15",
    time: "10:00",
    duration: 60,
    service: "Prótesis",
    status: "programada",
    notes: "",
  },
  {
    id: "10",
    patientId: "1",
    patientName: "María Rodríguez",
    doctorId: "3",
    doctorName: "Dr. Ramón Torres",
    date: "2026-03-03",
    time: "09:00",
    duration: 45,
    service: "Endodoncia",
    status: "programada",
    notes: "Seguimiento",
  },
];

export const mockRecords: ClinicalRecord[] = [
  {
    id: "1",
    patientId: "1",
    date: "2026-02-12",
    diagnosis: "Caries en diente #14, cara oclusal",
    treatment:
      "Restauración de composite directa. Anestesia local aplicada. Remoción de caries y restauración con resina A2.",
    prescriptions: "Ibuprofeno 400mg cada 8 horas por 3 días en caso de dolor",
    doctorName: "Dra. Sarah Kim",
    service: "Obturación",
    nextVisit: "2026-03-03",
  },
  {
    id: "2",
    patientId: "1",
    date: "2025-12-10",
    diagnosis:
      "Acumulación de sarro moderada, gingivitis leve en zona anteroinferior",
    treatment:
      "Limpieza dental completa con ultrasonido. Pulido con pasta profiláctica. Instrucciones de higiene oral.",
    prescriptions: "",
    doctorName: "Dra. Sarah Kim",
    service: "Limpieza",
    nextVisit: "2026-02-12",
  },
  {
    id: "3",
    patientId: "3",
    date: "2026-02-25",
    diagnosis: "Control de rutina. Sin hallazgos patológicos.",
    treatment: "Limpieza dental profiláctica. Aplicación de flúor.",
    prescriptions: "",
    doctorName: "Dra. Sarah Kim",
    service: "Limpieza",
    nextVisit: "2026-08-25",
  },
  {
    id: "4",
    patientId: "5",
    date: "2026-02-20",
    diagnosis:
      "Desajuste en prótesis parcial superior. Irritación en mucosa palatina.",
    treatment:
      "Rebase de prótesis parcial. Ajuste oclusal. Indicaciones de cuidado.",
    prescriptions:
      "Enjuague bucal con clorhexidina 0.12% dos veces al día por 7 días",
    doctorName: "Dr. Ramón Torres",
    service: "Prótesis",
    nextVisit: "2026-03-15",
  },
];

export const serviceTypes = [
  "Limpieza",
  "Obturación",
  "Endodoncia",
  "Extracción",
  "Blanqueamiento",
  "Consulta",
  "Prótesis",
  "Otro",
];

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const colors = [
    "bg-primary-soft text-primary",
    "bg-status-confirmed-bg text-status-confirmed",
    "bg-status-noshow-bg text-status-noshow",
    "bg-role-admin-bg text-role-admin",
    "bg-status-cancelled-bg text-status-cancelled",
    "bg-status-completed-bg text-status-completed",
  ];
  return colors[Math.abs(hash) % colors.length];
};

export const statusLabels: Record<AppointmentStatus, string> = {
  programada: "Programada",
  confirmada: "Confirmada",
  completada: "Completada",
  cancelada: "Cancelada",
  no_asistio: "No Asistió",
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  doctor: "Doctor",
  assistant: "Asistente",
};
