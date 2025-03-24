export type Lesson = {
    attendance: string;
    coin: number;
    id: string;
    lessonDate: [number, number, number]; // Tuple for year, month, day
    status: string;
}


interface Student {
    fullName: string;
    id: string;
    photoId: string;
}

interface ModuleBarchart {
    // Define the properties inside the object if known
    [key: string]: any;
}

export type HomeType = {
    activeCoin: number;
    allDebtor: number;
    attendanceAveragePercent: number;
    group: string;
    lesson: Lesson;
    lessonEndTime: string;
    lessonStartTime: string;
    moduleBarchart: ModuleBarchart[];
    student: Student;
    studentDebtors: StudentDebtor[];
};

type StudentDebtor = {
    invoiceId: string;
    leftoverAmount: number;
};

export type Payment = {
    id: string;
    amount: number;
    aim: string;
    timeTableName: string;
    groupName: string;
    paymentType: string;
    date: number; // Unix timestamp in milliseconds
    createdDate: number; // Unix timestamp in milliseconds
    cashier: string;
    canceled: boolean;
}




export type  Shop = {
    coinCost: number;
    fileId: string;
    id: string;
    name: string;
  };
  



  type PaymentLink = {
    link: string;
    merchantId: string;
    serviceId: string;
  };
  
  type Company = {
    branches: any[]; // You can replace 'any' with a more specific type if needed
    companyType: string;
    id: number;
    name: string;
  };
  
  type InvoiceInfo = {
    aim: string;
    invoiceAmount: number;
    invoiceLeftAmount: number;
    invoiceNumber: string;
    leftAmount: number;
    mustPaidAmount: number;
    payer: string;
  };
  
  type Payme = {
    link: string;
    merchant: string;
  };
  
  type Uzum = {
    link: string;
  };
  
  type LastPayments = any[]; // Replace 'any' with a more specific type for payments if available
  
  export type ApiResponsePayment = {
    data: {
      click: PaymentLink;
      company: Company;
      invoiceInfo: InvoiceInfo;
      lastPayments: LastPayments;
      payme: Payme;
      uzum: Uzum;
    };
    success: boolean;
  };
  