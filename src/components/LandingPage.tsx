"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Users,
  MessageSquare,
  Trophy,
  Zap,
  Target,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Counter animation component
function AnimatedCounter({
  target,
  duration = 2,
}: {
  target: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
      if (!isNaN(numericTarget)) {
        animate(0, numericTarget, {
          duration,
          ease: "easeOut",
          onUpdate: (value) => setCount(Math.floor(value)),
        });
      }
    }
  }, [isInView, target, duration]);

  const displayValue = target.includes("%")
    ? `${count}%`
    : target.includes("K")
    ? `${(count / 1000).toFixed(1)}K+`
    : `${count}+`;

  return <span ref={ref}>{displayValue}</span>;
}

export function LandingPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "실시간 팀 토론",
      description:
        "같은 입장의 사람들과 팀을 이뤄 실시간으로 소통하고 전략을 세워보세요.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "논증 시스템",
      description: "논리적인 근거를 제시하고 다른 사람들의 평가를 받아보세요.",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "투표 & 채택",
      description:
        "가장 설득력 있는 논증에 투표하고 베스트 논증을 선정해보세요.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "실시간 통계",
      description:
        "토론 현황을 실시간으로 확인하고 참여도를 시각화해서 볼 수 있어요.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "주제 선택",
      description: "관심 있는 토론 주제를 찾거나 새로운 주제를 만들어보세요.",
    },
    {
      number: "02",
      title: "팀 선택",
      description: "A팀 또는 B팀 중 자신의 입장을 선택해주세요.",
    },
    {
      number: "03",
      title: "토론 참여",
      description: "팀원들과 채팅하고 논증을 작성해서 상대방을 설득해보세요.",
    },
  ];

  const stats = [
    { number: "500+", label: "활성 토론" },
    { number: "10K+", label: "참여자" },
    { number: "50K+", label: "논증" },
    { number: "95%", label: "만족도" },
  ];

  // Refs for in-view animations
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50 pt-16 pb-20">
        <div className="absolute  inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,77,77,0.1)_50%,transparent_75%),linear-gradient(-45deg,transparent_25%,rgba(77,121,255,0.1)_50%,transparent_75%)]" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={{ containerVariants }}
            initial="hidden"
            animate="visible"
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-8"
              variants={{ itemVariants }}
              // variants={{itemVariants}}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                initial={{
                  boxShadow: "0 0px 0px rgba(255,77,77,0)",
                  scale: 1,
                  rotate: 0,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0px 20px rgba(255,77,77,0.3)",
                  transition: {
                    duration: 0.3,
                  },
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="text-white font-bold text-2xl">VS</span>
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div variants={{ itemVariants }}>
              <Badge className="mb-6 bg-gradient-to-r from-red-100 to-blue-100 text-gray-700 border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                새로운 토론 문화의 시작
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
              variants={{ itemVariants }}
            >
              사이버 VS 토론 플랫폼
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              variants={{ itemVariants }}
            >
              당신의 의견을 펼치고, 다른 사람들과 건전한 토론을 통해
              <br />
              새로운 관점을 발견해보세요
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={{ itemVariants }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href="/home">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                  >
                    지금 시작하기
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  플랫폼 둘러보기
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Floating VS Elements */}
        <motion.div
          className="absolute top-20 left-10 w-12 h-12 side-a rounded-full flex items-center justify-center opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-white font-bold">A</span>
        </motion.div>
        <motion.div
          className="absolute top-32 right-10 w-12 h-12 side-b rounded-full flex items-center justify-center opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <span className="text-white font-bold">B</span>
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 w-8 h-8 side-a rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-8 h-8 side-b rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={{ staggerContainerVariants }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={{ itemVariants }}
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter target={stat.number} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-gradient-to-b from-white to-gray-50"
        ref={featuresRef}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              <Target className="h-3 w-3 mr-1" />
              주요 기능
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              왜 우리 플랫폼을 선택해야 할까요?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              체계적이고 공정한 토론 환경에서 여러분의 생각을 자유롭게
              표현하세요
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{ staggerContainerVariants }}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={{ itemVariants }}>
                <Card className="text-center hover:shadow-lg debate-transition border-0 shadow-md h-full">
                  <motion.div
                    whileHover={{
                      y: -10,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    <CardContent className="pt-8 pb-6">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-blue-100 rounded-xl flex items-center justify-center text-red-600"
                        whileHover={{
                          scale: 1.1,
                          rotate: 10,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white" ref={stepsRef}>
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-red-100 text-red-700">
              <Shield className="h-3 w-3 mr-1" />
              이용 방법
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              간단한 3단계로 시작하세요
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              복잡한 가입 절차 없이 바로 토론에 참여할 수 있어요
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={{ staggerContainerVariants }}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center relative"
                  variants={{ itemVariants }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(255,77,77,0.4)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255,77,77,0.3)",
                        "0 0 30px rgba(77,121,255,0.3)",
                        "0 0 20px rgba(255,77,77,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Animated Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-8 left-full w-8 text-muted-foreground"
                      animate={{ x: [0, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-red-500 to-blue-500 text-white"
        ref={ctaRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            지금 바로 토론에 참여해보세요!
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            수많은 사람들이 이미 활발한 토론을 벌이고 있어요. 당신도 지금 바로
            참여해서 의견을 나눠보세요.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href="/home">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  무료로 시작하기
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
            <p className="text-sm opacity-75">
              가입 없이 바로 이용 가능 • 무료 서비스
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center"
            variants={{ containerVariants }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="flex justify-center mb-4"
              variants={{ itemVariants }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 },
                }}
              >
                <span className="text-white font-bold text-sm">VS</span>
              </motion.div>
            </motion.div>
            <motion.h3
              className="text-xl font-semibold mb-2"
              variants={{ itemVariants }}
            >
              사이버 VS 토론 플랫폼
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-6"
              variants={{ itemVariants }}
            >
              건전한 토론 문화를 만들어가는 플랫폼
            </motion.p>
            <motion.p
              className="text-sm text-gray-500"
              variants={{ itemVariants }}
            >
              Built with Next.js, TypeScript & Tailwind CSS
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
