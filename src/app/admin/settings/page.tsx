/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import GradualSpacing from "@/components/ui/gradual-spacing";


export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Settings" />
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest mt-48 text-gray-800 md:leading-[5rem]"
        text="Coming Soon"
      />
    </div>
  );
}
