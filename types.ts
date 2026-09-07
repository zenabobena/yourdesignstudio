export type Page =
    | 'home'
    | 'alerts'
    | 'database'
    | 'flagged-list'
    | 'report'
    | 'resources'
    | 'profile'
    | 'admin-dashboard'
    | 'login'
    | 'signup'
    | 'contact';

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
    savedAlerts?: string[];
    savedScams?: string[];
    reportedScams?: string[];
    joinedDate?: string;
}

export type ScamCategory =
    | 'Banking & Card Fraud'
    | 'WhatsApp & SMS Phishing'
    | 'Impersonation (SARS/Police/Bank)'
    | 'Job & Employment Offers'
    | 'Crypto & Investment Schemes'
    | 'Online Shopping & Marketplace'
    | 'Courier & Delivery Parcel'
    | 'SIM Swap & OTP Theft'
    | 'Tender & Business Fraud'
    | 'Advance Fee & Lottery'
    | 'Other';

export interface ScamReport {
    id: string;
    title: string;
    description: string;
    category: ScamCategory | string;
    scammerContact?: string;
    scammerName?: string;
    platform: string;
    date: string;
    status: 'pending' | 'verified' | 'flagged' | 'dismissed';
    upvotes: number;
    flaggedCount: number;
    location?: string;
    lossAmount?: number;
    reportedBy?: string;
    reportedByName?: string;
    evidenceUrl?: string;
    aiAnalysis?: string;
    dangerLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface ScamAlert {
    id: string;
    title: string;
    description: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    date: string;
    source?: string;
    affectedProvince?: string;
    advice?: string;
    savesCount?: number;
}

export interface FlaggedEntity {
    id: string;
    type: 'phone' | 'bank_account' | 'email' | 'website' | 'social_handle';
    value: string;
    label: string;
    reportsCount: number;
    lastReported: string;
    associatedScamType: string;
    status: 'active' | 'investigating' | 'confirmed_fraud';
}

export interface ResourceItem {
    id: string;
    title: string;
    category: 'emergency' | 'prevention' | 'recovery' | 'banking' | 'official' | 'legal';
    organization: string;
    description: string;
    phone?: string;
    email?: string;
    website?: string;
    actionSteps?: string[];
}
