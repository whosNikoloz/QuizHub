"use client";

import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import QuizApi from "@/app/api/MainApi/Quiz";

export default function QuizManagerPage({
  params: { lang, quizid },
}: {
  params: { lang: Locale; quizid: number };
}) {
  const api = QuizApi();

  return <>{quizid}</>;
}
