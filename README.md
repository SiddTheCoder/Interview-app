interview-app/
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx             # Auth pages
│   ├── register/page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx               # Main app after login
│   │   ├── interview/
│   │   │   ├── page.tsx           # Interview core UI
│   │   │   ├── components/        # UI components for questions, mic, scores
│   │   │   └── hooks/              # Custom hooks for interview flow
│   │   │
│   │   └── ai-playground/
│   │       ├── page.tsx           # Test AI models (STT, TTS, QGen, scoring)
│   │       └── components/
│   │
│   └── api/                       # API routes
│       ├── auth/
│       │   └── [...nextauth]/route.ts # NextAuth config
│       │
│       ├── stt/route.ts           # Speech-to-Text (Whisper)
│       ├── stt-answer/route.ts    # STT for answers
│       ├── tts/route.ts           # Text-to-Speech (Coqui)
│       ├── questions/route.ts     # Topic detection + Q generation (Mistral)
│       ├── score/route.ts         # Answer scoring
│       └── pusher/auth/route.ts   # Pusher auth for private channels
│
├── components/                    # Global reusable components
│   ├── ui/                         # ShadCN or other UI
│   ├── Navbar.tsx
│   ├── Footer.tsx
│
├── lib/
│   ├── dbConnect.ts                # MongoDB connection
│   ├── pusherServer.ts             # Pusher server instance
│   ├── pusherClient.ts             # Pusher client instance
│   ├── whisper.ts                  # Whisper wrapper
│   ├── mistral.ts                  # Mistral wrapper
│   ├── coqui.ts                    # Coqui TTS wrapper
│   └── speechBrain.ts              # SpeechBrain wrapper
│
├── models/
│   ├── User.ts
│   ├── InterviewSession.ts
│   ├── QuestionAnswer.ts
│
├── store/                          # Redux Toolkit
│   ├── index.ts                    # Store config
│   ├── slices/
│   │   ├── userSlice.ts
│   │   ├── interviewSlice.ts
│   │   ├── aiPlaygroundSlice.ts
│
├── public/
│   ├── audio/                      # Sample audios or TTS outputs
│
├── .env.local                      # Env vars (MongoDB URI, Pusher keys, etc.)
├── package.json
├── tsconfig.json
└── README.md
