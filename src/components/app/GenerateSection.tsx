"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

export function Generate({ user }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const [usedQuota, setUsedQuota] = useState(user?.limit?.used);

  useEffect(() => {
    if (input.length <= 100) setError(false);
  }, [input]);

  const saveSuggestion = async (suggestion: string, input: string) => {
    try {
      const res = await fetch("/api/save-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ suggestion, input }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      setLoading(false);
      setUsedQuota(usedQuota + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e: any) => {
    setSuggestion("");
    // Check character limit
    if (input.length > 100) return setError(true);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, userId: user.id }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      // This data is a ReadableStream
      const data = res.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let finishedCopy = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setSuggestion((prev) => `${prev}${chunkValue}`);
        finishedCopy = `${finishedCopy}${chunkValue}`;
      }
      saveSuggestion(finishedCopy, input);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Greetings */}
      <div className="mt-16 flex flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-0">
        <h1 className="h4">
          Hello{" "}
          <span className="text-crimson-9">{user?.name ? user.name : ""}</span>
        </h1>
        {user?.limit && usedQuota < user?.limit.limit ? (
          <p>{`${usedQuota}/${user?.limit.limit} copy remaining`}</p>
        ) : (
          <div className="flex items-center gap-3">
            <p>
              {user?.limit?.limit}/{user?.limit?.limit} free quota over. Extras
              charged per copy
            </p>
            <Button variant={"secondary"} href="/billing">
              Upgrade
            </Button>
          </div>
        )}
      </div>
      {/* Generate Section */}
      <div className="mb-12 mt-8 flex flex-col items-start gap-8 xl:mb-60 xl:flex-row xl:justify-between xl:gap-0">
        {/* Input field for prompt*/}
        <div className="flex w-full flex-col gap-8 xl:w-[473px]">
          <div className="flex flex-col">
            <div className="relative">
              <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Explain your idea in 100 characters. Eg. Promote a luxury tailoring shop called "Spins" `}
                className="body w-full resize-none rounded-[4px] border border-slate-6 bg-slate-2 p-6  placeholder:text-slate-9"
              />
              {/* Character length indicator */}
              <div
                className={`caption-s absolute bottom-4 right-3 ${
                  input.length > 100 ? "text-red-500" : "text-slate-9"
                }`}
              >
                <span>{input.length}</span>/100 remaining
              </div>
            </div>
            {/* Error Message */}
            {error && (
              <p className="-mt-1 text-xs text-red-600">
                Character limit exceeded
              </p>
            )}
          </div>
          <Button
            variant="primary"
            type="button"
            onClick={submit}
            className="disabled:bg-slate-3 disabled:text-slate-11"
            // disabled={usedQuota < user?.limit.limit ? false : true}
          >
            {loading ? "Generating your copy..." : "Generate marketing copy"}
          </Button>
        </div>
        {/* Output field for marketing copy */}
        <div className="h-64 w-full rounded-[4px] border border-slate-6 bg-slate-2 p-10 xl:h-[384px] xl:w-[640px]">
          {suggestion ? (
            <p className="body">{suggestion}</p>
          ) : (
            <h3 className="body-l-semibold text-slate-9">
              Your AI generated marketing copy will appear here!
            </h3>
          )}
        </div>
      </div>
    </>
  );
}
