import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getSkillsRequest,
  getSkillByIdRequest,
  createSkillRequest,
  updateSkillRequest,
  deleteSkillRequest,
} from "./request";
import { onMutateError } from "@/lib/utils"; 
import type { Skill, SkillCreateRequest, SkillUpdateRequest } from "./type";

export const SkillQueryKey = {
  all: ["skills"] as const,
  detail: (id: string) => ["skills", "detail", id] as const,
};

// QUERIES
export const useSkillsQuery = () =>
  useQuery<Skill[]>({
    queryKey: SkillQueryKey.all,
    queryFn: getSkillsRequest,
  });

export const useSkillByIdQuery = (id?: string) =>
  useQuery<Skill>({
    queryKey: SkillQueryKey.detail(id || "unknown"),
    queryFn: () => getSkillByIdRequest(id as string),
    enabled: !!id,
  });

// MUTATIONS (Order style + default cache updates cho create & update, KHÔNG chain)
export const useCreateSkillMutation = (
  options?: UseMutationOptions<Skill, Error, SkillCreateRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<Skill, Error, SkillCreateRequest>({
    mutationFn: createSkillRequest,
    onSuccess: (created) => {
      qc.setQueryData<Skill[]>(SkillQueryKey.all, (old) =>
        old ? [...old, created] : [created]
      );
      qc.setQueryData(SkillQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUpdateSkillMutation = (
  options?: UseMutationOptions<Skill, Error, SkillUpdateRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<Skill, Error, SkillUpdateRequest>({
    mutationFn: updateSkillRequest,
    onSuccess: (updated) => {
      qc.setQueryData<Skill[]>(SkillQueryKey.all, (old) =>
        (old || []).map((s) => (s.id === updated.id ? updated : s))
      );
      qc.setQueryData(SkillQueryKey.detail(updated.id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteSkillMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) =>
  useMutation({
    mutationFn: deleteSkillRequest,
    onError: onMutateError,
    ...options,
  });
