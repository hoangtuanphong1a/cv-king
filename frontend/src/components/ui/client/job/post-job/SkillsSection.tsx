/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useState } from "react";
import { FieldErrors } from "react-hook-form";
import { TextField, CircularProgress } from "@mui/material";
import { CreateJobFormData } from "@/api/Job/type";
import { useCreateSkillMutation } from "@/api/Skill/query";
import { useCreateJobTagMutation } from "@/api/Tag/query";

// chỉ mutation ở đây


type Option = { id: string; name: string };

interface Props {
  skills: string[];
  tags: string[];
  onSkillsChange: (skills: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  errors: FieldErrors<CreateJobFormData>;
  suggestedSkills: Option[]; // nhận từ parent
  suggestedTags: Option[];   // nhận từ parent
}

export default function SkillsSection({
  skills,
  tags,
  onSkillsChange,
  onTagsChange,
  errors,
  suggestedSkills,
  suggestedTags,
}: Props) {
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [skillError, setSkillError] = useState<string | null>(null);
  const [tagError, setTagError] = useState<string | null>(null);

  const { mutateAsync: createSkillAsync, isPending: creatingSkill } = useCreateSkillMutation();
  const { mutateAsync: createTagAsync, isPending: creatingTag } = useCreateJobTagMutation();

  const textSx = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "0.875rem",
      height: "48px",
      padding: "0 12px",
      "& .MuiInputBase-input": { padding: "12px 0" },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
  };

  const norm = (s: string) => s.trim().toLowerCase();

  const addExistingSkillById = (id: string) => {
    if (skills.includes(id)) {
      setSkillError("Kỹ năng đã tồn tại");
      return;
    }
    onSkillsChange([...skills, id]);
  };

  const addExistingTagById = (id: string) => {
    if (tags.includes(id)) {
      setTagError("Thẻ đã tồn tại");
      return;
    }
    onTagsChange([...tags, id]);
  };

  const addSkill = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSkillError(null);

    // 1) nếu đã có theo name -> add ngay
    const exist = suggestedSkills.find((s) => norm(s.name) === norm(trimmed));
    if (exist) {
      addExistingSkillById(exist.id);
      setSkillInput("");
      return;
    }

    // 2) tạo mới -> add vào form
    try {
      const created = await createSkillAsync({ Name: trimmed });
      addExistingSkillById(created.id);
      setSkillInput("");
    } catch (e: any) {
      setSkillError(e?.message || "Không thể tạo kỹ năng");
      console.error(e);
    }
  };

  const addTag = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setTagError(null);

    const exist = suggestedTags.find((t) => norm(t.name) === norm(trimmed));
    if (exist) {
      addExistingTagById(exist.id);
      setTagInput("");
      return;
    }

    try {
      const created = await createTagAsync({ Name: trimmed });
      addExistingTagById(created.id);
      setTagInput("");
    } catch (e: any) {
      setTagError(e?.message || "Không thể tạo thẻ");
      console.error(e);
    }
  };

  const removeSkill = (id: string) => onSkillsChange(skills.filter((s) => s !== id));
  const removeTag = (id: string) => onTagsChange(tags.filter((t) => t !== id));

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Kỹ năng và thẻ</h2>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kỹ năng</label>
        <div className="flex gap-3">
          <div className="flex-grow relative">
            <TextField
              type="text"
              placeholder="Nhập kỹ năng và nhấn Enter"
              className="w-full"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await addSkill(skillInput);
                }
              }}
              variant="outlined"
              sx={textSx}
              error={!!errors.skillIds || !!skillError}
              helperText={errors.skillIds?.message || skillError}
              disabled={creatingSkill}
            />
            {creatingSkill && (
              <CircularProgress size={24} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600" />
            )}
          </div>
          <button
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 text-sm font-medium flex items-center gap-2"
            onClick={async () => await addSkill(skillInput)}
            type="button"
            disabled={!skillInput.trim() || creatingSkill}
          >
            {creatingSkill ? <CircularProgress size={16} color="inherit" /> : null}
            Thêm
          </button>
        </div>

        {!!skills.length && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((id) => {
              const skill = suggestedSkills.find((s) => s.id === id) || { id, name: id };
              return (
                <span key={id} className="px-3 py-1 text-sm bg-orange-100 border border-orange-200 rounded-full flex items-center">
                  {skill.name}
                  <button
                    className="ml-2 text-orange-600 hover:text-orange-800"
                    onClick={() => removeSkill(id)}
                    type="button"
                    aria-label={`Xóa ${skill.name}`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng gợi ý</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                className={`px-3 py-1 text-sm rounded-full border transition duration-200 ${
                  skills.includes(skill.id)
                    ? "bg-orange-200 text-orange-800 border-orange-300"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => addExistingSkillById(skill.id)}
                disabled={skills.includes(skill.id) || creatingSkill}
              >
                {skills.includes(skill.id) ? skill.name : `+ ${skill.name}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thẻ</label>
        <div className="flex gap-3">
          <div className="flex-grow relative">
            <TextField
              type="text"
              placeholder="Nhập thẻ và nhấn Enter"
              className="w-full"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await addTag(tagInput);
                }
              }}
              variant="outlined"
              sx={textSx}
              error={!!errors.tagIds || !!tagError}
              helperText={errors.tagIds?.message || tagError}
              disabled={creatingTag}
            />
            {creatingTag && (
              <CircularProgress size={24} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600" />
            )}
          </div>
          <button
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 text-sm font-medium flex items-center gap-2"
            onClick={async () => await addTag(tagInput)}
            type="button"
            disabled={!tagInput.trim() || creatingTag}
          >
            {creatingTag ? <CircularProgress size={16} color="inherit" /> : null}
            Thêm
          </button>
        </div>

        {!!tags.length && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((id) => {
              const tag = suggestedTags.find((t) => t.id === id) || { id, name: id };
              return (
                <span key={id} className="px-3 py-1 text-sm bg-orange-100 border border-orange-200 rounded-full flex items-center">
                  {tag.name}
                  <button
                    className="ml-2 text-orange-600 hover:text-orange-800"
                    onClick={() => removeTag(id)}
                    type="button"
                    aria-label={`Xóa ${tag.name}`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Thẻ gợi ý</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={`px-3 py-1 text-sm rounded-full border transition duration-200 ${
                  tags.includes(tag.id)
                    ? "bg-orange-200 text-orange-800 border-orange-300"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => addExistingTagById(tag.id)}
                disabled={tags.includes(tag.id) || creatingTag}
              >
                {tags.includes(tag.id) ? tag.name : `+ ${tag.name}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
