import Image from "next/image";
import P from "../P";
import { HorizontalLine } from "../UtilComponents/Horizontalline";

type Role =
  | "Dev"
  | "Shitposter"
  | "Content-Creator"
  | "Company"
  | "VC"
  | "Chad";

type Badge = {
  badgeName: string;
  badgeDescription: string;
};

type Wallet = {
  walletAddress: string;
  additional_wallets: string[];
};

type ExternalProfile = {
  name: string;
  username: string;
  url: string;
};

type Profile = {
  profilePic: string;
  userName: string;
  displayName: string;
  userId: string;
  profileDescription: string;
  profileMetadata: Record<string, any>;
  members?: string[];
  role: Role;
  externalProfiles: ExternalProfile[];
  email?: string;
  reputation: number;
  badges: Badge[];
  followers: number;
  wallets: Wallet[];
  metadata: Record<string, any>;
};

const profileLogoMap = {
  Twitter: "/twitter.svg",
  GitHub: "/github.svg",
};

const dummyProfile: Profile = {
  profilePic: "/user.svg",
  userName: "solana_dev",
  displayName: "Solana Dev",
  userId: "123e4567-e89b-12d3-a456-426614174000",
  profileDescription: "Building decentralized applications on Solana.",
  profileMetadata: { twitter: "https://twitter.com/solana_dev" },
  role: "Dev",
  externalProfiles: [
    {
      name: "Twitter",
      username: "soalan_dev",
      url: "https://twitter.com/solana_dev",
    },
    {
      name: "GitHub",
      username: "soalan_dev_git",
      url: "https://github.com/soalan_dev",
    },
  ],
  email: "solana_dev@gmail.com",
  reputation: 50,
  badges: [
    {
      badgeName: "Top Developer",
      badgeDescription: "Awarded for top Solana contributions",
    },
  ],
  followers: 15000,
  wallets: [
    {
      walletAddress: "5YQy98Wv2ULZiKnH1Tkh3VxWw8wAEcHKHV4s7sXftuLL",
      additional_wallets: ["5YQy98Wv2ULZiKnH1Tkh3VxWw8wAEcHKHV4s7sXftuLL"],
    },
  ],
  metadata: { customField: "Some custom value" },
};

export const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-[10px] w-full items-start p-[10px]">
      <div className="flex flex-row gap-[10px] w-full items-start p-[10px]">
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex flex-col gap-[5px] items-start w-full">
            <div className="flex w-full h-[100px] items-center justify-center border border-[2px] border-border">
              <Image
                src={dummyProfile.profilePic}
                alt="profile-pic"
                className="w-[50px] h-[50px] rounded-full border border-[2px] border-border p-[1px]"
                height={50}
                width={50}
              />
            </div>
            <div className="flex flex-row items-center gap-[5px]">
              <P className="text-[20px] font-bold">
                {dummyProfile.displayName}
              </P>
              <P className="text-[16px] font-bold text-primary/90">
                @{dummyProfile.userName}
              </P>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <P className="text-[15px] font-bold">
              {dummyProfile.profileDescription}
            </P>
          </div>
          <div className="flex gap-[10px]">
            <P className="text-[18px] font-bold">
              <span className="text-primary font-bold">Reputation:</span>{" "}
              {dummyProfile.reputation}
            </P>
          </div>
          <div className="flex gap-[10px]">
            <P className="text-[18px] font-bold">
              <span className="text-primary font-bold">Followers:</span>{" "}
              {dummyProfile.followers}
            </P>
          </div>
          <div className="flex gap-[10px]">
            <P className="text-[18px] font-bold">
              <span className="text-primary font-bold">Badges:</span>{" "}
              {dummyProfile.badges.map((badge) => badge.badgeName).join(", ")}
            </P>
          </div>
          <div className="flex flex-row gap-[10px]">
            <span className="text-primary font-bold">Wallets:</span>
            <div className="flex flex-row gap-[10px]">
              <span className="font-bold text-[18px]">[</span>
              <P className="text-[18px] font-bold">
                {dummyProfile.wallets
                  .map((wallet) => wallet.walletAddress)
                  .join(", ")}
              </P>
              <span className="font-bold text-[18px]">]</span>
            </div>
          </div>
          <div className="flex flex-row gap-[10px]">
            <P className="text-[18px] text-primary font-bold">
              External Profiles:
            </P>
            <div className="flex flex-row gap-[10px]">
              <span className="font-bold text-[18px]">[</span>
              {dummyProfile.externalProfiles.map((profile) => (
                <div className="flex flex-row" key={profile.name}>
                  <div className="flex flex-row gap-[5px] items-center">
                    <Image
                      src={
                        profileLogoMap[
                          profile.name as keyof typeof profileLogoMap
                        ]
                      }
                      alt="profile-pic"
                      className="w-[20px] h-[20px]"
                      height={40}
                      width={40}
                    />
                    <a
                      key={profile.name}
                      href={profile.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[18px] font-bold border-b-[1px] border-primary"
                    >
                      <P className="text-[18px] font-bold">
                        {profile.username}
                      </P>
                    </a>
                  </div>
                  <span className="font-bold">, </span>
                </div>
              ))}
              <span className="font-bold text-[18px]">]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
