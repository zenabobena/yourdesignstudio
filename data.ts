import { ScamReport, ScamAlert, FlaggedEntity, ResourceItem } from './types';

export const INITIAL_ALERTS: ScamAlert[] = [
    {
        id: 'alt-1',
        title: 'Urgent: Fake Capitec & FNB SMS prompting immediate "Device Authorisation" link',
        description: 'Victims receive an SMS claiming an unknown iPhone 15 was linked to their banking app. The link leads to a clone phishing portal asking for Banking PIN and Remote App App-code.',
        category: 'Banking & Card Fraud',
        severity: 'critical',
        date: 'Today at 08:30',
        source: 'SABRIC Community Advisory',
        affectedProvince: 'National (Gauteng & Western Cape surge)',
        advice: 'Never click bank links in SMS. Banks will NEVER ask you to authorize or cancel a link via SMS.',
        savesCount: 142
    },
    {
        id: 'alt-2',
        title: 'WhatsApp "Hi Mom / Hi Dad, I broke my phone" emergency cash scam',
        description: 'Scammers message parents from an unknown number pretending to be their child with an urgent financial emergency, asking for instant eWallet or PayShap transfers.',
        category: 'WhatsApp & SMS Phishing',
        severity: 'high',
        date: 'Yesterday',
        source: 'Verified Community Reports',
        affectedProvince: 'All Provinces',
        advice: 'Always call your child on their regular number or insist on a voice note before sending any money.',
        savesCount: 98
    },
    {
        id: 'alt-3',
        title: 'Fake SARS eFiling refund notification via email and SMS',
        description: 'Fraudulent notices saying "You have an outstanding tax refund of R8,450 ready for disbursement". Links steal debit card details and 3D Secure OTPs.',
        category: 'Impersonation (SARS/Police/Bank)',
        severity: 'high',
        date: '3 days ago',
        source: 'SARS Security Bulletin',
        affectedProvince: 'National',
        advice: 'SARS will only communicate refunds within the official eFiling portal. Check directly on sars.gov.za.',
        savesCount: 76
    },
    {
        id: 'alt-4',
        title: 'Facebook Marketplace "Proof of Payment" driver collection fraud',
        description: 'Scammer agrees to buy an item, sends a forged PDF SMS/bank notification, and arranges an Uber/courier to fetch the goods immediately before money clears.',
        category: 'Online Shopping & Marketplace',
        severity: 'medium',
        date: '4 days ago',
        source: 'Consumer Protection Watch',
        affectedProvince: 'Western Cape, KZN, Gauteng',
        advice: 'Never release items until the cash reflects in your actual bank balance (not just available balance/SMS).',
        savesCount: 112
    }
];

export const INITIAL_REPORTS: ScamReport[] = [
    {
        id: 'rep-1',
        title: 'Fake DHL / SAPO parcel clearance fee SMS',
        description: 'Received an SMS claiming parcel #ZA-9921 is held at customs. Required payment of R42.50 to release. When entering card details, a transaction of R4,250 was attempted.',
        category: 'Courier & Delivery Parcel',
        scammerContact: '+27 71 884 9201',
        platform: 'SMS & Phishing Website',
        date: '2026-09-02',
        status: 'verified',
        upvotes: 48,
        flaggedCount: 12,
        location: 'Gauteng',
        lossAmount: 4250,
        reportedByName: 'Thabo M.',
        dangerLevel: 'critical',
        aiAnalysis: 'Identified as aggressive credential-harvesting phishing gateway targeting South African courier brands.'
    },
    {
        id: 'rep-2',
        title: 'Mining company HR clerk job scam asking for "Medical Clearance Fee"',
        description: 'Offered an admin position at Anglo American in Rustenburg. Was asked to pay R750 upfront via PEP Paxi for pre-employment medical checks.',
        category: 'Job & Employment Offers',
        scammerContact: '+27 82 443 1190 / hr-anglo@consultant.com',
        platform: 'WhatsApp & Email',
        date: '2026-09-01',
        status: 'verified',
        upvotes: 35,
        flaggedCount: 8,
        location: 'North West',
        lossAmount: 750,
        reportedByName: 'Nandi K.',
        dangerLevel: 'high',
        aiAnalysis: 'Legitimate employers never charge job applicants for interviews, uniforms, or background checks.'
    },
    {
        id: 'rep-3',
        title: 'Telegram Forex & Binance Trading Bot doubling deposit in 24 hours',
        description: 'Promised guaranteed 150% return in 24 hours. Once R2,000 was deposited, the admin blocked me and removed me from the VIP channel.',
        category: 'Crypto & Investment Schemes',
        scammerContact: '@ForexMaster_SA_Trader',
        platform: 'Telegram',
        date: '2026-08-30',
        status: 'verified',
        upvotes: 62,
        flaggedCount: 19,
        location: 'KwaZulu-Natal',
        lossAmount: 2000,
        reportedByName: 'Johan V.',
        dangerLevel: 'high',
        aiAnalysis: 'Classic Ponzi / Advance fee scheme operating under anonymous Telegram aliases.'
    },
    {
        id: 'rep-4',
        title: 'Fake Car Dealership on Gumtree requiring "Holding Deposit"',
        description: 'Advertised a 2018 VW Polo for R65,000. Claimed the seller was relocating overseas and needed R5,000 holding deposit via Instant EFT before viewing.',
        category: 'Online Shopping & Marketplace',
        scammerContact: '+27 63 901 4432',
        platform: 'Gumtree / Classifieds',
        date: '2026-08-28',
        status: 'verified',
        upvotes: 29,
        flaggedCount: 6,
        location: 'Western Cape',
        lossAmount: 5000,
        reportedByName: 'Sipho Z.',
        dangerLevel: 'critical',
        aiAnalysis: 'Holding deposit fraud. Physical vehicle does not exist.'
    }
];

export const INITIAL_FLAGGED: FlaggedEntity[] = [
    {
        id: 'flg-1',
        type: 'phone',
        value: '+27 71 884 9201',
        label: 'Courier Phishing SMS Sender',
        reportsCount: 42,
        lastReported: '2 hours ago',
        associatedScamType: 'Delivery & Customs Fee Phishing',
        status: 'confirmed_fraud'
    },
    {
        id: 'flg-2',
        type: 'bank_account',
        value: 'Capitec Acc: 1849204481 (Branch 470010)',
        label: 'Fake Gumtree Vehicle Deposit Muling Account',
        reportsCount: 19,
        lastReported: 'Yesterday',
        associatedScamType: 'Marketplace Advance Fee Fraud',
        status: 'investigating'
    },
    {
        id: 'flg-3',
        type: 'website',
        value: 'https://sars-efiling-refund-gov-za.net',
        label: 'Cloned SARS Phishing Portal',
        reportsCount: 88,
        lastReported: '4 hours ago',
        associatedScamType: 'Tax Authority Impersonation',
        status: 'confirmed_fraud'
    },
    {
        id: 'flg-4',
        type: 'phone',
        value: '+27 82 443 1190',
        label: 'Bogus HR Medical Fee WhatsApp Number',
        reportsCount: 15,
        lastReported: '3 days ago',
        associatedScamType: 'Employment Fee Extortion',
        status: 'confirmed_fraud'
    },
    {
        id: 'flg-5',
        type: 'email',
        value: 'notification@support-fnb-verify.co.za',
        label: 'Phishing email domain impersonating FNB security team',
        reportsCount: 64,
        lastReported: '1 day ago',
        associatedScamType: 'Banking Credentials Harvest',
        status: 'confirmed_fraud'
    }
];

export const RESOURCES_LIST: ResourceItem[] = [
    {
        id: 'res-1',
        title: 'SABRIC (South African Banking Risk Information Centre)',
        category: 'banking',
        organization: 'SABRIC',
        description: 'Combats organized bank-related crime and provides authoritative prevention guidance and fraud reporting channels for all South African banks.',
        phone: '011 844 9700',
        website: 'https://www.sabric.co.za',
        actionSteps: [
            'Immediately contact your own bank fraud line to freeze compromised accounts.',
            'Report the incident to SABRIC for inter-bank fraud tracking.',
            'Request a fraud reference number.'
        ]
    },
    {
        id: 'res-2',
        title: 'SAPS Directorate for Priority Crime Investigation (Hawks)',
        category: 'emergency',
        organization: 'South African Police Service',
        description: 'Mandated to investigate serious commercial and cybercrimes, syndicates, and large-scale financial fraud.',
        phone: '10111 / 012 846 4000',
        website: 'https://www.saps.gov.za',
        actionSteps: [
            'Open a formal criminal case at your nearest police station.',
            'Take bank statements, SMS screenshots, and scammer contact numbers.',
            'Obtain your official CAS (Crime Administration System) number.'
        ]
    },
    {
        id: 'res-3',
        title: 'Southern African Fraud Prevention Service (SAFPS)',
        category: 'recovery',
        organization: 'SAFPS',
        description: 'Offers free protective registration if your ID document, passport, or personal details were stolen, preventing scammers from opening accounts in your name.',
        phone: '011 867 2234',
        website: 'https://www.safps.org.za',
        actionSteps: [
            'Register for SAFPS Protective Registration immediately after any identity leak.',
            'Credit providers will be required to do extra biometric verification on your profile.',
            'Service is completely free for individual victims.'
        ]
    },
    {
        id: 'res-4',
        title: 'National Consumer Commission (NCC)',
        category: 'legal',
        organization: 'Department of Trade, Industry and Competition',
        description: 'Handles pyramid schemes, deceptive trade practices, false advertising, and unresolved disputes with retail service providers.',
        phone: '012 428 7000',
        website: 'https://www.thencc.gov.za',
        actionSteps: [
            'File a complaint form for non-delivery or deceptive business practices.',
            'Keep full documentation of written contracts and payment receipts.'
        ]
    }
];
