from typing import Any

from core.components.entity.entity import Entity
from models.core.base_model import ModelState
from models.models.discrete_event_model import DiscreteEventModel, ModelInput


# https://simulemos.cl/books/simio/page/source

class Source(DiscreteEventModel):

    def __init__(self, entity: Entity, time: float):
        pass

    def _internalStateTransitionFunction(self, state: ModelState) -> ModelState:
        pass

    def _externalStateTransitionFunction(self, state: ModelState, inputs: ModelInput, event_time: float) -> ModelState:
        return state

    def _timeAdvanceFunction(self, state: ModelState) -> float:
        pass

    def _outputFunction(self, state: ModelState) -> Any:
        pass
