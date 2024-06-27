"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Authentication from "@/app/api/user/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";
import { QuizModel } from "@/app/interface/MainInterfaces";

interface GeneralEditProps {
  quiz: QuizModel;
  onChange: (updatedInfo: { updateQuiz: QuizModel }) => void;
}

function QuizDisplay({ quiz, onChange }: GeneralEditProps) {
  return <></>;
}

export default QuizDisplay;
