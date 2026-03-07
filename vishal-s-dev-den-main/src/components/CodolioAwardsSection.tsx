import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, ExternalLink, RefreshCw, Star, Shield, Medal } from "lucide-react";

interface Badge {
    name: string;
    shortName?: string | null;
    displayName?: string | null;
    hoverText?: string | null;
    icon?: string | null;
    stars?: number | null;
    category?: string | null;
}

interface Certificate {
    name: string;
    type: string;
    imageUrl?: string | null;
}

interface PlatformAwards {
    platform: string;
    platformLabel: string;
    handle: string;
    profileUrl: string;
    badges: Badge[];
    certificates: Certificate[];
    color: string;
    gradient: string;
    glow: string;
    borderColor: string;
    bgAccent: string;
    iconComponent: typeof Award;
}

const PLATFORM_CONFIG: Record<string, Omit<PlatformAwards, 'badges' | 'certificates' | 'handle' | 'profileUrl'>> = {
    leetcode: {
        platform: "leetcode",
        platformLabel: "LeetCode",
        color: "#FFA116",
        gradient: "from-amber-500/20 via-orange-500/10 to-yellow-600/5",
        glow: "rgba(255,161,22,0.35)",
        borderColor: "border-amber-500/30",
        bgAccent: "bg-amber-500/10",
        iconComponent: Medal,
    },
    codechef: {
        platform: "codechef",
        platformLabel: "CodeChef",
        color: "#5B4638",
        gradient: "from-amber-800/20 via-yellow-900/10 to-orange-800/5",
        glow: "rgba(139,109,82,0.35)",
        borderColor: "border-amber-700/30",
        bgAccent: "bg-amber-700/10",
        iconComponent: Shield,
    },
    hackerrank: {
        platform: "hackerrank",
        platformLabel: "HackerRank",
        color: "#00EA64",
        gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/5",
        glow: "rgba(0,234,100,0.35)",
        borderColor: "border-emerald-500/30",
        bgAccent: "bg-emerald-500/10",
        iconComponent: Star,
    },
};

const MOCK_AWARDS: PlatformAwards[] = [
    {
        ...PLATFORM_CONFIG.leetcode,
        handle: "vishal_patel1",
        profileUrl: "https://leetcode.com/vishal_patel1",
        badges: [{ name: "Annual Badge", displayName: "50 Days Badge 2025", icon: "https://assets.leetcode.com/static_assets/others/lg2550.png", stars: null }],
        certificates: [],
    },
    {
        ...PLATFORM_CONFIG.codechef,
        handle: "bold_olive_19",
        profileUrl: "https://www.codechef.com/users/bold_olive_19",
        badges: [
            { name: "Contest Contender - Bronze Badge", displayName: "Received for participating in 5 Contests", icon: "https://cdn.codechef.com/images/badges/contest/bronze.svg", stars: null },
            { name: "Problem Solver - Bronze Badge", displayName: "Received for solving 50 Problems", icon: "https://cdn.codechef.com/images/badges/problem/bronze.svg", stars: null },
        ],
        certificates: [],
    },
    {
        ...PLATFORM_CONFIG.hackerrank,
        handle: "vishalchoudhar23",
        profileUrl: "https://www.hackerrank.com/vishalchoudhar23",
        badges: [
            { name: "Problem Solving", stars: 5, icon: null, displayName: null },
            { name: "Java", stars: 1, icon: null, displayName: null },
        ],
        certificates: [
            { name: "Problem Solving (Basic)", type: "skill" },
            { name: "Java (Basic)", type: "skill" },
        ],
    },
];

const parseAwardsFromPayload = (payload: any): PlatformAwards[] | null => {
    try {
        const platforms = payload?.data?.platformProfiles?.platformProfiles;
        if (!platforms || !Array.isArray(platforms)) return null;

        const targetPlatforms = ["leetcode", "codechef", "hackerrank"];
        const result: PlatformAwards[] = [];

        platforms.forEach((p: any) => {
            if (!targetPlatforms.includes(p.platform)) return;
            const config = PLATFORM_CONFIG[p.platform];
            if (!config) return;

            const badges: Badge[] = (p.badgeStats?.badgeList || []).map((b: any) => ({
                name: b.name || "",
                shortName: b.shortName,
                displayName: b.displayName,
                hoverText: b.hoverText,
                icon: b.icon,
                stars: b.stars,
                category: b.category,
            }));

            const certificates: Certificate[] = (p.certificateStats?.certificates || []).map((c: any) => ({
                name: c.name || "",
                type: c.type || "",
                imageUrl: c.imageUrl,
            }));

            if (badges.length > 0 || certificates.length > 0) {
                const handle = p.userStats?.handle || "";
                let profileUrl = "#";
                if (p.platform === "leetcode") profileUrl = `https://leetcode.com/${handle}`;
                else if (p.platform === "codechef") profileUrl = `https://www.codechef.com/users/${handle}`;
                else if (p.platform === "hackerrank") profileUrl = `https://www.hackerrank.com/${handle}`;

                result.push({ ...config, handle, profileUrl, badges, certificates });
            }
        });

        return result.length > 0 ? result : null;
    } catch (e) {
        console.error("Failed to parse awards:", e);
        return null;
    }
};

const StarRating = ({ count, color }: { count: number; color: string }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={14}
                className="transition-transform"
                fill={i < count ? color : "transparent"}
                stroke={i < count ? color : "rgba(255,255,255,0.2)"}
            />
        ))}
    </div>
);

const BadgeCard = ({ badge, platformColor, delay }: { badge: Badge; platformColor: string; delay: number }) => {
    const hasBadgeIcon = badge.icon && badge.icon.length > 0;
    const title = badge.shortName || badge.displayName || badge.name;
    const subtitle = badge.hoverText || badge.displayName || (badge.shortName ? badge.name : null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="relative group"
        >
            {/* Glow on hover */}
            <div
                className="absolute -inset-0.5 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: platformColor }}
            />

            <div className="relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm group-hover:border-white/[0.15] group-hover:bg-white/[0.06] transition-all duration-300">
                {/* Badge icon or star rating */}
                {hasBadgeIcon ? (
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.1] p-2 group-hover:scale-110 transition-transform duration-300">
                        <img src={badge.icon!} alt={badge.name} className="w-full h-full object-contain" />
                    </div>
                ) : badge.stars ? (
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className="w-14 h-14 flex items-center justify-center rounded-full border-2"
                            style={{ borderColor: platformColor, boxShadow: `0 0 20px ${platformColor}40` }}
                        >
                            <span className="text-2xl font-bold" style={{ color: platformColor }}>
                                {badge.stars}★
                            </span>
                        </div>
                        <StarRating count={badge.stars} color={platformColor} />
                    </div>
                ) : (
                    <div
                        className="w-14 h-14 flex items-center justify-center rounded-xl"
                        style={{ background: `${platformColor}20`, border: `1px solid ${platformColor}30` }}
                    >
                        <Award size={24} style={{ color: platformColor }} />
                    </div>
                )}

                {/* Title */}
                <h4 className="text-sm font-semibold text-foreground text-center leading-tight">{title}</h4>

                {/* Subtitle */}
                {subtitle && subtitle !== title && (
                    <p className="text-xs text-muted-foreground text-center leading-snug">{subtitle}</p>
                )}
            </div>
        </motion.div>
    );
};

const CertificateChip = ({ cert, color, delay }: { cert: Certificate; color: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all cursor-default"
    >
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${color}25` }}>
            <Award size={11} style={{ color }} />
        </div>
        <span className="text-xs font-medium text-foreground">{cert.name}</span>
        <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
        >
            {cert.type}
        </span>
    </motion.div>
);

const CodolioAwardsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [platformAwards, setPlatformAwards] = useState<PlatformAwards[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);

    const fetchAwards = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/codolio?t=${Date.now()}`);
            const result = await response.json();
            if (result.success && result.payload) {
                const parsed = parseAwardsFromPayload(result.payload);
                if (parsed) {
                    setPlatformAwards(parsed);
                    setIsLive(true);
                    setIsLoading(false);
                    return;
                }
            }
            throw new Error("No awards data");
        } catch (err) {
            console.warn("Awards fetch failed, using mock data:", err);
            setPlatformAwards(MOCK_AWARDS);
            setIsLive(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    return (
        <section id="platform-awards" className="py-20 relative overflow-hidden" ref={ref}>
            {/* Ambient effects */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <motion.div
                        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6 mx-auto"
                    >
                        <Award size={30} className="text-primary" />
                    </motion.div>
                    <h2 className="section-title text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        Platform Awards
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                        Badges, achievements & certifications from{" "}
                        <a
                            href="https://codolio.com/profile/V_Patel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            Codolio <ExternalLink size={13} />
                        </a>
                    </p>
                    {/* Live / Sync indicator */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400" : "bg-yellow-400"}`} />
                                {isLive && <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />}
                            </div>
                            <span className="text-xs text-muted-foreground">{isLive ? "Live Data" : "Sample Data"}</span>
                        </div>
                        <button
                            onClick={fetchAwards}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw size={11} className={isLoading ? "animate-spin" : ""} />
                            Sync
                        </button>
                    </div>
                </motion.div>

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-12">
                        {platformAwards.map((platform, pIdx) => {
                            const PlatformIcon = platform.iconComponent;
                            return (
                                <motion.div
                                    key={platform.platform}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: pIdx * 0.15 }}
                                >
                                    {/* Platform header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: `${platform.color}20`, border: `1px solid ${platform.color}30` }}
                                        >
                                            <PlatformIcon size={20} style={{ color: platform.color }} />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-foreground">{platform.platformLabel}</h3>
                                            <a
                                                href={platform.profileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors hover:bg-white/5"
                                                style={{ color: platform.color, borderColor: `${platform.color}40` }}
                                            >
                                                @{platform.handle} <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Awards card container with gradient border */}
                                    <div className="relative group/platform">
                                        <div
                                            className="absolute -inset-0.5 rounded-2xl blur opacity-10 group-hover/platform:opacity-20 transition-opacity duration-700"
                                            style={{ background: `linear-gradient(135deg, ${platform.color}, transparent)` }}
                                        />
                                        <div className={`relative rounded-2xl border ${platform.borderColor} bg-card/40 backdrop-blur-xl p-6 md:p-8`}>
                                            {/* Top accent */}
                                            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${platform.color}60, transparent 60%)` }} />

                                            {/* Badges grid */}
                                            {platform.badges.length > 0 && (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                    {platform.badges.map((badge, bIdx) => (
                                                        <BadgeCard
                                                            key={`${badge.name}-${bIdx}`}
                                                            badge={badge}
                                                            platformColor={platform.color}
                                                            delay={pIdx * 0.1 + bIdx * 0.08}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Certificates */}
                                            {platform.certificates.length > 0 && (
                                                <div className={platform.badges.length > 0 ? "mt-6 pt-6 border-t border-white/[0.06]" : ""}>
                                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                                                        Certificates
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {platform.certificates.map((cert, cIdx) => (
                                                            <CertificateChip
                                                                key={cert.name}
                                                                cert={cert}
                                                                color={platform.color}
                                                                delay={pIdx * 0.1 + cIdx * 0.06}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CodolioAwardsSection;
